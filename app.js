import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sessions from 'express-session'
import cors from 'cors';

import models from './models.js';
import dotenv from 'dotenv';
dotenv.config();

import WebAppAuthProvider from 'msal-node-wrapper'

// for google authentication
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import findOrCreate from "mongoose-findorcreate";

const authConfig = {
    // auth: {
    //     clientId: "694c3e20-5c5c-4aba-82ea-70df9da00fb0",
    //     authority: "https://login.microsoftonline.com/f6b6dd5b-f02f-441a-99a0-162ac5060bd2",
    //     clientSecret: "Do18Q~3jVv6ffePZCAn_bFva.VOpl~fhvR-D4dup",
    //     redirectUri: "/redirect"
    // },
    auth: {
        clientId: `${process.env.MICROSOFT_CLIENT_ID}`,
        authority: `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}`,
        clientSecret: `${process.env.MICROSOFT_CLIENT_SECRET}`,
        redirectUri: "/redirect",  //note: you can explicitly make this "localhost:3000/redirect" or "examplesite.me/redirect"
    },    
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: 3,
        }
    }
};

//import api router

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import apiV1Router from './routes/api/v1/apiv1.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './front-end/build')));

const oneDay = 1000 * 60 * 60 * 24
app.use(sessions({
    secret: "this is some secret key I am making up v45v;lkjgdsal;nwqt49asglkn",
    saveUninitialized: true,
    cookie: {maxAge: oneDay},
    resave: false
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(models.User.createStrategy());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
    try {
      const user = await models.User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
  

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, done) {
    // It's crucial to handle the case where the email may not be provided.
    const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : `unknown-${profile.id}@noemail.com`;

    // Now, use the email as a username (or however you wish to structure this)
    models.User.findOrCreate({ googleId: profile.id }, {
      username: email,
      name: `${profile.name.givenName} ${profile.name.familyName}`,
      ThemePreference: "",
      created_date: new Date(),
      created_tags: ["Not Started", "In Progress", "Completed"]
    }, function (err, user) {
      return done(err, user);
    });
  }
));


// Google auth route
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google auth callback
app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  function(req, res) {
    // Setting the isAuthenticated flag after successful Google authentication
    req.session.isAuthenticated = true;
    req.session.authType = 'google';
    res.redirect("/#/home");
  }
);



const authProvider = await WebAppAuthProvider.WebAppAuthProvider.initialize(authConfig);
app.use(authProvider.authenticate());

app.use((req, res, next) => {
    console.log("session info:", req.session)
    next();
})

app.use((req, res, next) => {
    req.models = models;
    next();
});

app.use('/api/v1', apiV1Router);

app.get(
	'/signin',
	(req, res, next) => {
        console.log("reached signin");
		return req.authContext.login({
			postLoginRedirectUri: "/postlogin"
            //postLoginRedirectUri: "/#/home", // redirect here after login
		})(req, res, next);
	}
);

// app.get(
// 	'/signout',
// 	(req, res, next) => {
// 		return req.authContext.logout({
//             //postLogoutRedirectUri: "/postlogin"
// 			postLogoutRedirectUri: "/#/home", // redirect here after logout
// 		})(req, res, next);
// 	}
// );

app.get('/postlogin', async (req, res) => {
    console.log("Reached the API router for users");
    req.session.authType = 'microsoft';
    req.session.isAuthenticated = true;
    try {
        let existingUser = null;

        // Try to find the user by username or Google ID based on the session info.
        try {
            if (req.session.account && req.session.account.username) {
                existingUser = await req.models.User.findOne({ username: req.session.account.username });
            }
            if (!existingUser && req.session.passport && req.session.passport.user) {
                existingUser = await req.models.User.findOne({ googleId: req.session.passport.user });
            }
        } catch (error) {
            console.error("Error during user lookup:", error);
            return res.status(500).json({ status: "error", error: "Error during user lookup" });
        }

        // Check if the user exists, if so, redirect to home.
        if (existingUser) {
            return res.redirect('/#/home');
        }

        // Create a new user based on the session information available.
        let newUserDetails = {
            username: req.session.account ? req.session.account.username : undefined,
            name: req.session.account ? req.session.account.name : undefined,
            googleId: req.session.passport ? req.session.passport.user : undefined,
            ThemePreference: "", // Assuming default theme preference is empty
            created_date: new Date(),
            created_tags: ["Not Started", "In Progress", "Completed"]
        };

        // Note: You need to handle the case where neither username nor googleId is available.
        if (!newUserDetails.username && !newUserDetails.googleId) {
            console.error("No sufficient session information to create a user.");
            return res.status(400).json({ status: "error", error: "Insufficient session information." });
        }

        const newUser = new req.models.User(newUserDetails);
        console.log("NEW user:", newUser);

        await newUser.save();
        res.redirect("/#/home");
    } catch (error) {
        console.error("Error in post-login processing", error);
        res.status(500).json({ "status": "error", "error": error });
    }
});

app.get('/signout', (req, res) => {
    if (req.session.authType === 'google') {
        req.logout(function(err) {
            if (err) { return next(err); }
                req.session.destroy(() => {
                    res.redirect('/');  // Or wherever you want to redirect post-logout
            });
        });
    } else if (req.session.authType === 'microsoft') {
        // Microsoft logout logic
        console.log("logout of microsoft");
        return req.authContext.logout({
            postLogoutRedirectUri: "/#/home",  // Example redirect URI
        })(req, res);
    } else {
        // Default action for other cases or if not authenticated
        res.redirect('/');
    }
});

// All other GET requests not handled before will return our React app
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../front-end/build', 'index.html/'));
  });

export default app;