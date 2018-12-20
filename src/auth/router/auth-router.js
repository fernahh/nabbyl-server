const { Router } = require('express')
const authRedirectHandler = require('../handlers/redirect')
const authRouter = Router()

authRouter.get('/', authRedirectHandler)

module.exports = authRouter
