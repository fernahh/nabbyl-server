const generateID = require('../../../utils/generate-id')
const stringify = require('../../../utils/stringify')
const { spotify } = require('../../../config/environment')

module.exports = (request, response) => {
  const stateValue = generateID()
  response.cookie(spotify.stateKey, stateValue)
  response.redirect(`${spotify.authorizeUrl}?${buildParams(stateValue)}`)
}

function buildParams(state) {
  return stringify({
    response_type: 'code',
    client_id: spotify.clientID,
    scope: 'user-read-private user-read-email',
    redirect_uri: spotify.authorizeCallbackUrl,
    state
  })
}
