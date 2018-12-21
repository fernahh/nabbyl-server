const authRedirectHandler = require('../handlers/redirect')
const authCallbackHandler = require('../handlers/callback')
const authRouter = require('./auth-router')

jest.mock('express', () => require('@mocks/express-mock'))

describe('Auth Routes', () => {
  it('register the root route', () => {
    expect(authRouter.get).toBeCalledWith('/', authRedirectHandler)
  })

  it('register the callback route', () => {
    expect(authRouter.get).toBeCalledWith('/callback', authCallbackHandler)
  })
})
