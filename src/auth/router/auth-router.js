const { Router } = require('express')
const authRedirectHandler = require('../handlers/redirect')
const authCallbackHandler = require('../handlers/callback')
const authRouter = Router()

authRouter.get('/', authRedirectHandler)
authRouter.get('/callback', authCallbackHandler)

module.exports = authRouter
