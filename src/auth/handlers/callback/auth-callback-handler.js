const { spotify } = require('../../../config/environment')
const authTokenHandler = require('../token')

module.exports = (request, response) => {
  request.clearCookie(spotify.stateKey)
  request.post(buildAuthOptions(request), authTokenHandler)
}

function buildAuthOptions(request) {
  return {
    url: spotify.authorizeTokenUrl,
    form: {
      code: request.query.code,
      redirect_uri: spotify.authorizeCallbackUrl,
      grant_type: 'authorization_code'
    },
    headers: {
      Authorization: buildAuthorizationHeader()
    },
    json: true
  }
}

function buildAuthorizationHeader() {
  return `Basic ${Buffer.from(
    `${spotify.clientID}:${spotify.clientSecret}`
  ).toString('base64')}`
}
