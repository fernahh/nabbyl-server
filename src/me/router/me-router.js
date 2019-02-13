const { Router } = require('express')
const getMeHandler = require('../handlers/get')
const meRouter = Router()

meRouter.get('/', getMeHandler)

module.exports = meRouter
