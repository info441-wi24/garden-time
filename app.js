import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sessions from 'express-session'

import models from './models.js';
import dotenv from 'dotenv';
dotenv.config();

import WebAppAuthProvider from 'msal-node-wrapper'

const authConfig = {
    auth: {
        clientId: `${process.env.CLIENT_ID}`,
        authority: `https://login.microsoftonline.com/${process.env.AUTHORITY}`,
        clientSecret: `${process.env.CLIENT_SECRET}`,
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.use(logger('dev'));
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

const authProvider = await WebAppAuthProvider.WebAppAuthProvider.initialize(authConfig);
app.use(authProvider.authenticate());

app.use((req, res, next) => {
    console.log("session info:", req.session)
    next();
})



app.get(
	'/signin',
	(req, res, next) => {
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


app.use((req, res, next) => {
    req.models = models;
    next();
});

export default app;