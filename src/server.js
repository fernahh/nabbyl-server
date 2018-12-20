const express = require('express')
const authRouter = require('./auth/router/auth-router')

const app = express()

app.use('/auth', authRouter)
app.listen(3000)
