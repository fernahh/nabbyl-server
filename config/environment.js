const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  port: process.env.PORT,
  spotify: {
    apiUrl: process.env.SPOTIFY_API_URL,
    authorizeCallbackUrl: process.env.SPOTIFY_AUTHORIZE_CALLBACK_URL,
    authorizeTokenUrl: process.env.SPOTIFY_AUTHORIZE_TOKEN_URL,
    authorizeUrl: process.env.SPOTIFY_AUTHORIZE_URL,
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    stateKey: process.env.SPOTIFY_STATE_KEY
  },
  webClient: {
    redirectUrl: process.env.WEB_CLIENT_REDIRECT_URL,
    url: process.env.WEB_CLIENT_URL
  }
}
