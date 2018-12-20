const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  port: process.env.PORT,
  spotify: {
    authorizeCallbackUrl: process.env.SPOTIFY_AUTHORIZE_CALLBACK_URL,
    authorizeUrl: process.env.SPOTIFY_AUTHORIZE_URL,
    clientID: process.env.SPOTIFY_CLIENT_ID,
    stateKey: process.env.SPOTIFY_STATE_KEY,
  }
}
