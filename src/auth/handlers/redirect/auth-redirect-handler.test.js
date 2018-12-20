const authRedirectHandler = require('./auth-redirect-handler')
const generateID = require('../../../utils/generate-id')
const stringify = require('../../../utils/stringify')
const environment = require('../../../config/environment')
const responseMock = require('@mocks/response-mock')

jest.mock('../../../utils/generate-id')
jest.mock('../../../utils/stringify')
jest.mock('../../../config/environment', () => require('@mocks/environment-mock'))

describe('Auth Redirect Handler', () => {
  const mockGenerateID = () => {
    generateID.mockImplementation(() => 'abcdef')
  }

  const mockStringify = () => {
    stringify.mockImplementation(() => 'id=123')
  }

  const stubAuthRedirectHandler = (request, response) => {
    authRedirectHandler(request, response)
  }

  beforeEach(() => {
    mockGenerateID()
    mockStringify()
    stubAuthRedirectHandler(null, responseMock)
  })

  it('redirect to authorize url', () => {
    expect(stringify).toBeCalledWith({
      response_type: 'code',
      client_id: 'some-client-id',
      scope: 'user-read-private user-read-email',
      redirect_uri: 'nabil.com/callback/',
      state: 'abcdef'
    })
    expect(responseMock.cookie).toBeCalledWith('some-key', 'abcdef')
    expect(responseMock.redirect).toBeCalledWith('spotify.com?id=123')
  })
})
