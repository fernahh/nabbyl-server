const { Router } = require('express')
const authRouter = Router()

authRouter.get('/', (req, res) => {
  res.send('Auth home page')
})

module.exports = authRouter
