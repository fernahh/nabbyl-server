const { port, webClient } = require('../config/environment.js')
const express = require('express')
const cors = require('cors')
const authRouter = require('./auth/router/auth-router')
const albumsRouter = require('./albums/router/albums-router')
const meRouter = require('./me/router/me-router')

const app = express()

app.use(cors({ origin: webClient.url, exposedHeaders: ['Offset'] }))
app.use('/albums', albumsRouter)
app.use('/auth', authRouter)
app.use('/me', meRouter)
app.listen(port)
