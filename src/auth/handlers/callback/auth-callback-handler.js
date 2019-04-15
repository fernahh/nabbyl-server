const authTokenHandler = require('../token')
const { spotify } = require('../../../../config/environment')
const { post } = require('../../../utils/http')
const stringify = require('../../../utils/stringify')

module.exports = (req, res) => {
  const { stateKey, authorizeTokenUrl } = spotify
  const params = buildParams(req)
  const config = buildConfig()

  res.clearCookie(stateKey)

  post(authorizeTokenUrl, params, config).then(
    response => {
      authTokenHandler(res, response.data)
    },
    err => {
      const { status, message } = err.response.data.error
      res.status(status)
      res.json({ message })
    }
  )
}

function buildParams(request) {
  return stringify({
    code: request.query.code,
    redirect_uri: spotify.authorizeCallbackUrl,
    grant_type: 'authorization_code'
  })
}

function buildConfig() {
  return {
    headers: {
      Authorization: buildAuthorizationHeader()
    }
  }
}

function buildAuthorizationHeader() {
  return `Basic ${Buffer.from(
    `${spotify.clientID}:${spotify.clientSecret}`
  ).toString('base64')}`
}
