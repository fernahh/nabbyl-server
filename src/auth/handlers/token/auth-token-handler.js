const { webClient } = require('../../../../config/environment.js')
const stringify = require('../../../utils/stringify')

module.exports = (response, body) => {
  response.redirect(`${webClient.redirectUrl}/#${buildParams(body)}`)
}

function buildParams(body) {
  const { access_token, refresh_token } = body
  return stringify({ access_token, refresh_token })
}
