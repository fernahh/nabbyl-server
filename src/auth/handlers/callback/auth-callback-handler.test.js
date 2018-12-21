const authCallbackHandler = require('./auth-callback-handler')
const authTokenHandler = require('../token')
const { spotify } = require('../../../config/environment')
const requestMock = require('@mocks/request-mock')

jest.mock('../../../config/environment', () =>
  require('@mocks/environment-mock')
)

describe('Auth Callback Handler', () => {
  const stubAuthCallbackHandler = (request, response) => {
    authCallbackHandler(request, response)
  }

  const mockRequest = () => {
    requestMock.query = {
      code: 'abcdef',
      state: 'the-state-value',
      cookies: {
        [spotify.stateKey]: 'the-stored-state'
      }
    }
  }

  beforeEach(() => {
    mockRequest()
    stubAuthCallbackHandler(requestMock, null)
  })

  it('clear the state cookie', () => {
    expect(requestMock.clearCookie).toBeCalledWith('state-key')
  })

  it('send a request post to token URL with auth options', () => {
    expect(requestMock.post).toBeCalledWith({
      url: spotify.authorizeTokenUrl,
      form: {
        code: 'abcdef',
        redirect_uri: spotify.authorizeCallbackUrl,
        grant_type: 'authorization_code'
      },
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${spotify.clientID}:${spotify.clientSecret}`
        ).toString('base64')}`
      },
      json: true
    }, authTokenHandler)
  })
})
