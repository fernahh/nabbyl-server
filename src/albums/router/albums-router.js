const { Router } = require('express')
const getAlbumsHandler = require('../handlers/get')
const albumsRouter = Router()

albumsRouter.get('/', getAlbumsHandler)

module.exports = albumsRouter
