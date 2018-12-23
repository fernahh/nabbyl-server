const axios = require('axios')

const post = (url, params, config) => axios.post(url, params, config)
const get = (url, config) => axios.get(url, config)

module.exports = { get, post }
