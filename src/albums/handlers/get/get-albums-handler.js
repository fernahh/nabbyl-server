const getColors = require('get-image-colors')
const { get } = require('../../../utils/http')
const { spotify } = require('../../../config/environment')

module.exports = (req, res) => {
  const url = `${spotify.apiUrl}/me/albums/`

  get(url, buildHeaders(req)).then(response => {
    const albums = response.data.items.map(async (item) => { 
      const imageUrl = item.album.images[0].url
      const colors = await getColors(imageUrl)
      item.album.colors = colors.map(getHexadecimalValue)
      return item
    })

    Promise.all(albums).then(albumsWithColors => res.json(albumsWithColors))
  })
}

function getHexadecimalValue(color) {
  return color.hex()
}

function buildHeaders(request) {
  return {
    headers: {
      'Authorization': request.headers['authorization']
    }
  }
}
