const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  port: process.env.PORT,
  spotifyAuthorizeUrl: process.env.SPOTIFY_AUTHORIZE_URL,
  spotifyClientID: process.env.SPOTIFY_CLIENT_ID
}
