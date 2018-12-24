const axios = require('axios')

const post = (url, params, config) => axios.post(url, params, config)
const get = (url, params, config) => axios.get(url, params, config)

module.exports = { get, post }
