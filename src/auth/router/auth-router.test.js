const authRedirectHandler = require('../handlers/redirect')
const authRouter = require('./auth-router')

jest.mock('express', () => require('@mocks/express-mock'))

describe('Auth Routes', () => {
  it('register the root route', () => {
    expect(authRouter.get).toBeCalledWith('/', authRedirectHandler)
  })
})
