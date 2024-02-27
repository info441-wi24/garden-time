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

const authConfig = {
    auth: {
        clientId: "694c3e20-5c5c-4aba-82ea-70df9da00fb0",
        authority: "https://login.microsoftonline.com/f6b6dd5b-f02f-441a-99a0-162ac5060bd2",
        clientSecret: "Do18Q~3jVv6ffePZCAn_bFva.VOpl~fhvR-D4dup",
        redirectUri: "/redirect"
        // redirectUri: "https://a5-rsrika-websharer.azurewebsites.net/redirect", //note: you can explicitly make this "localhost:3000/redirect" or "examplesite.me/redirect"
    },
    // auth: {
        
    //     clientId: `${process.env.CLIENT_ID}`,
    //     authority: `https://login.microsoftonline.com/${process.env.AUTHORITY}`,
    //     clientSecret: `${process.env.CLIENT_SECRET}`,
    //     redirectUri: "/redirect",  //note: you can explicitly make this "localhost:3000/redirect" or "examplesite.me/redirect"
    // },    
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
app.use(express.static(path.join(__dirname, './public/build')));

const oneDay = 1000 * 60 * 60 * 24
app.use(sessions({
    secret: "this is some secret key I am making up v45v;lkjgdsal;nwqt49asglkn",
    saveUninitialized: true,
    cookie: {maxAge: oneDay},
    resave: false
}))

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
			postLoginRedirectUri: "/", // redirect here after login
		})(req, res, next);
	}
);

app.get(
	'/signout',
	(req, res, next) => {
		return req.authContext.logout({
			postLogoutRedirectUri: "/", // redirect here after logout
		})(req, res, next);
	}
);

// All other GET requests not handled before will return our React app
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/build', 'index.html/home'));
  });


export default app;
