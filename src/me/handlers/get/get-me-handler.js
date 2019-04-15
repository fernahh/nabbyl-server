const { get } = require('../../../utils/http')
const { spotify } = require('../../../../config/environment')

module.exports = (req, res) => {
  const url = `${spotify.apiUrl}/me/`

  get(url, buildHeaders(req)).then(
    response => {
      res.json(response.data)
    },
    err => {
      const { status, message } = err.response.data.error
      res.status(status)
      res.json({ message })
    }
  )
}

function buildHeaders(request) {
  return {
    headers: {
      Authorization: request.headers['authorization']
    }
  }
}
