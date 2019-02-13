const meRouter = require('./me-router')
const getMeHandler = require('../handlers/get')

jest.mock('express', () => require('@mocks/express-mock'))

describe('Me Routes', () => {
  it('register the root route', () => {
    expect(meRouter.get).toBeCalledWith('/', getMeHandler)
  })
})
