const querystring = require('querystring')

module.exports = value => querystring.parse(value)
