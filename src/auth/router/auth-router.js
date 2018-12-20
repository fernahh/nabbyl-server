const { Router } = require('express')
const authRedirectHandler = require('../handlers/auth-redirect-handler')
const authRouter = Router()

authRouter.get('/', authRedirectHandler)

module.exports = authRouter
