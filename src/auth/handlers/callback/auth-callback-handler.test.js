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
  })

  it('clear the state cookie', () => {
    mockStringify()
    stubPost('success', postResponseMock)
    stubAuthCallbackHandler(requestMock, responseMock)
    expect(responseMock.clearCookie).toBeCalledWith('state-key')
  })

  it('send a request post to token URL with auth options', () => {
    mockStringify()
    stubPost('success', postResponseMock)
    stubAuthCallbackHandler(requestMock, responseMock)
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
    mockStringify()
    stubPost('success', postResponseMock)
    stubAuthCallbackHandler(requestMock, responseMock)
    expect(authTokenHandler).toBeCalledWith(responseMock, postResponseMock.data)
  })

  it('handle a error when can not post an auth token', () => {
    const err = {
      response: {
        data: {
          error: {
            status: 400,
            message: 'some message'
          }
        }
      }
    }
    stubPost('error', err)
    stubAuthCallbackHandler(requestMock, responseMock)
    expect(responseMock.status).toBeCalledWith(err.response.data.error.status)
    expect(responseMock.json).toBeCalledWith({
      message: err.response.data.error.message
    })
  })
})
