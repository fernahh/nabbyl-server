const getColors = require('get-image-colors')
const parseQueryString = require('../../../utils/parse-query-string')
const { get } = require('../../../utils/http')
const { spotify } = require('../../../../config/environment')

module.exports = (req, res) => {
  const { offset } = req.query
  const baseUrl = `${spotify.apiUrl}/me/albums?`
  const requestUrl = `${baseUrl}offset=${offset}`

  get(requestUrl, buildHeaders(req)).then(
    response => {
      const { items, next } = response.data
      const albums = items.map(addColorPalette)
      res.set('Offset', getOffset(next, baseUrl))

      Promise.all(albums).then(albumsWithColorPalette =>
        res.json(albumsWithColorPalette)
      )
    },
    err => {
      const { status, message } = err.response.data.error
      res.status(status)
      res.json({ message })
    }
  )
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

function getOffset(next, url) {
  const params = parseQueryString(next.replace(url, ''))
  return params.offset
}

function buildHeaders(request) {
  return {
    headers: {
      Authorization: request.headers['authorization']
    }
  }
}
