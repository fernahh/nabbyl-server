const getAlbumsHandler = require('./get-albums-handler')
const { get } = require('../../../utils/http')
const { spotify } = require('../../../config/environment')
const promiseMock = require('@mocks/promise-mock')
const responseMock = require('@mocks/response-mock')
const requestMock = require('@mocks/request-mock')

jest.mock('../../../utils/http')
jest.mock('../../../config/environment', () =>
  require('@mocks/environment-mock')
)

describe('Get Albums Handler', () => {
  const albumsResponseMock = {
    data: {
      foo: 'bar'
    }
  }

  const stubGet = (type, response) => {
    const promise = promiseMock(type, response)
    get.mockReturnValue(promise)
  }

  const stubGetAlbumsHandler = (request, body) => {
    getAlbumsHandler(request, body)
  }

  const mockRequest = () => {
    requestMock.headers = {
      Authorization: `Bearer some-token`
    }
  }

  beforeEach(() => {
    stubGet('success', albumsResponseMock)
    stubGetAlbumsHandler(requestMock, responseMock)
  })

  it('send the albums response', () => {
    const url = `${spotify.apiUrl}/me/albums/`
    const config = { headers: requestMock.headers }
    expect(get).toBeCalledWith(url, config)
    expect(responseMock.json).toBeCalledWith(albumsResponseMock.data)
  })
})
