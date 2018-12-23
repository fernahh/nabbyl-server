const albumsRouter = require('./albums-router')
const getAlbumsHandler = require('../handlers/get')

jest.mock('express', () => require('@mocks/express-mock'))

describe('Albms Routes', () => {
  it('register the root route', () => {
    expect(albumsRouter.get).toBeCalledWith('/', getAlbumsHandler)
  })
})
