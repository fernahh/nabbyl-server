const getColors = require('get-image-colors')
const { get } = require('../../../utils/http')
const { spotify } = require('../../../config/environment')

module.exports = (req, res) => {
  const url = `${spotify.apiUrl}/me/albums/`

  get(url, buildHeaders(req)).then(response => {
    const { items } = response.data
    const albums = items.map(addColorPalette)
    Promise.all(albums).then(albumsWithColorPalette =>
      res.json(albumsWithColorPalette)
    )
  })
}

async function addColorPalette(item) {
  const { url } = item.album.images[0]
  const palette = await getColors(url)
  const colors = palette.map(getHexadecimalValue)
  item.album.colors = colors

  return item
}

function getHexadecimalValue(color) {
  return color.hex()
}

function buildHeaders(request) {
  return {
    headers: {
      Authorization: request.headers['authorization']
    }
  }
}
