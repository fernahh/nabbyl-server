const getMeHandler = require('./get-me-handler')
const { get } = require('../../../utils/http')
const { spotify } = require('../../../../config/environment')
const promiseMock = require('@mocks/promise-mock')
const responseMock = require('@mocks/response-mock')
const requestMock = require('@mocks/request-mock')

jest.mock('../../../utils/http')
jest.mock('../../../../config/environment', () =>
  require('@mocks/environment-mock')
)

describe('Get Me Handler', () => {
  const meResponseMock = {
    data: {
      foo: 'bar'
    }
  }

  const stubGet = (type, response) => {
    const promise = promiseMock(type, response)
    get.mockReturnValue(promise)
  }

  const stubGetMeHandler = (request, body) => {
    getMeHandler(request, body)
  }

  const mockRequest = () => {
    requestMock.headers = {
      authorization: 'Bearer some-token'
    }
  }

  beforeEach(() => {
    mockRequest()
    stubGet('success', meResponseMock)
    stubGetMeHandler(requestMock, responseMock)
  })

  it('send the me response', () => {
    const url = `${spotify.apiUrl}/me/`
    const config = {
      headers: {
        Authorization: requestMock.headers['authorization']
      }
    }
    expect(get).toBeCalledWith(url, config)
    expect(responseMock.json).toBeCalledWith(meResponseMock.data)
  })
})
