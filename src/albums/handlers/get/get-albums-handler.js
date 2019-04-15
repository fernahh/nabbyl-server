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
      try {
        const { items, next } = response.data
        const albums = items.map(addColorPalette)
        res.set('Offset', getOffset(next, baseUrl))
        Promise.all(albums).then(albumsWithColorPalette =>
          res.json(albumsWithColorPalette)
        )
      } catch (error) {
        res.status(500)
        res.json({ message: error })
      }
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
  return next ? parseQueryString(next.replace(url, '')).offset : null
}

function buildHeaders(request) {
  return {
    headers: {
      Authorization: request.headers['authorization']
    }
  }
}
