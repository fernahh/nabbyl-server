const authTokenHandler = require('./auth-token-handler')
const stringify = require('../../../utils/stringify')
const { webClient } = require('../../../../config/environment.js')
const requestMock = require('@mocks/request-mock')

jest.mock('../../../utils/stringify')

describe('Auth Token Handler', () => {
  const bodyMock = {
    access_token: 'abcdef',
    refresh_token: '123456'
  }

  const mockStringify = () => {
    stringify.mockImplementation(
      () => 'access_token=abcdef&refresh_token=123456'
    )
  }

  const stubAuthTokenHandler = (request, body) => {
    authTokenHandler(request, body)
  }

  beforeEach(() => {
    mockStringify()
    stubAuthTokenHandler(requestMock, bodyMock)
  })

  it('redirect with tokens', () => {
    expect(requestMock.redirect).toBeCalledWith(
      `${webClient.redirectUrl}/#access_token=abcdef&refresh_token=123456`
    )
  })
})
