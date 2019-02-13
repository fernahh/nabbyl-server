const { port, webClient } = require('./config/environment.js')
const express = require('express')
const cors = require('cors')
const authRouter = require('./auth/router/auth-router')
const meRouter = require('./me/router/me-router')

const app = express()

app.use(cors({ origin: webClient.url }))
app.use('/auth', authRouter)
app.use('/me', meRouter)
app.listen(port)
