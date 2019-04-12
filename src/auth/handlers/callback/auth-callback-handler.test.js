const authCallbackHandler = require('./auth-callback-handler')
const authTokenHandler = require('../token')
const { spotify } = require('../../../../config/environment')
const { post } = require('../../../utils/http')
const stringify = require('../../../utils/stringify')
const promiseMock = require('@mocks/promise-mock')
const requestMock = require('@mocks/request-mock')
const responseMock = require('@mocks/response-mock')

jest.mock('../token', () => jest.fn())
jest.mock('../../../utils/http')
jest.mock('../../../utils/stringify')
jest.mock('../../../../config/environment', () =>
  require('@mocks/environment-mock')
)

describe('Auth Callback Handler', () => {
  const stubAuthCallbackHandler = (request, response) => {
    authCallbackHandler(request, response)
  }

  const mockStringify = () => {
    stringify.mockImplementation(() => 'id=123')
  }

  const stubPost = (type, response) => {
    const promise = promiseMock(type, response)
    post.mockReturnValue(promise)
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

  const buildHeaders = () => {
    return {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${spotify.clientID}:${spotify.clientSecret}`
        ).toString('base64')}`
      }
    }
  }

  const postResponseMock = {
    data: ''
  }

  beforeEach(() => {
    mockRequest()
    mockStringify()
    stubPost('success', postResponseMock)
    stubAuthCallbackHandler(requestMock, responseMock)
  })

  it('clear the state cookie', () => {
    expect(responseMock.clearCookie).toBeCalledWith('state-key')
  })

  it('send a request post to token URL with auth options', () => {
    const { authorizeTokenUrl, authorizeCallbackUrl } = spotify
    const params = 'id=123'
    const config = buildHeaders()

    expect(stringify).toBeCalledWith({
      code: requestMock.query.code,
      redirect_uri: authorizeCallbackUrl,
      grant_type: 'authorization_code'
    })
    expect(post).toBeCalledWith(authorizeTokenUrl, params, config)
  })

  it('run the auth token handler', () => {
    expect(authTokenHandler).toBeCalledWith(responseMock, postResponseMock.data)
  })
})
