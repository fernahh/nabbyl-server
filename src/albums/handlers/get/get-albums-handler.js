const { get } = require('../../../utils/http')
const { spotify } = require('../../../config/environment')

module.exports = (req, res) => {
  const albumsUrl = `${spotify.apiUrl}/me/albums/`
  const { headers } = req
  const config = { headers }

  get(albumsUrl, config).then(response => {
    res.json(response.data)
  })
}
