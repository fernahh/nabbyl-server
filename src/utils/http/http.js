const axios = require('axios')

const post = (url, params, config) => axios.post(url, params, config)

module.exports = { post }
