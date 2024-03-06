import express from 'express';
import request from 'request';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const spotifyClientID = process.env.SPOTIFY_CLIENT_ID;
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const spotifyRedirectURI = '/auth/spotify/callback';

function generateRandomString(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

router.get('/login', (req, res) => {
  const scope = 'streaming user-read-email user-read-private';
  const state = generateRandomString(16);
  const authQueryParameters = new URLSearchParams({
    response_type: 'code',
    client_id: spotifyClientID,
    scope: scope,
    redirect_uri: spotifyRedirectURI,
    state: state,
  });
  res.redirect('https://accounts.spotify.com/authorize/?' + authQueryParameters.toString());
});

router.get('/callback', (req, res) => {
  const code = req.query.code || null;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: spotifyRedirectURI,
      grant_type: 'authorization_code',
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer.from(spotifyClientID + ':' + spotifyClientSecret).toString('base64')),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    json: true,
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      access_token = body.access_token;
      res.redirect('/')
    }
  });

});

export default router;
