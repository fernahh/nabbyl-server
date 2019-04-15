const getAlbumsHandler = require('./get-albums-handler')
const { get } = require('../../../utils/http')
const { spotify } = require('../../../../config/environment')
const promiseMock = require('@mocks/promise-mock')
const responseMock = require('@mocks/response-mock')
const requestMock = require('@mocks/request-mock')

jest.mock('../../../utils/http')
jest.mock('get-image-colors', () => require('@mocks/get-image-colors-mock'))
jest.mock('../../../../config/environment', () =>
  require('@mocks/environment-mock')
)

describe('Get Albums Handler', () => {
  const albumsResponseMock = {
    data: {
      items: [
        {
          album: {
            images: [{ url: 'some-url.com' }]
          }
        }
      ],
      next: `${spotify.apiUrl}/me/albums?offset=0`
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
    Object.assign(requestMock, {
      query: { offset: 0 },
      headers: {
        Authorization: `Bearer some-token`
      }
    })
  }

  beforeEach(() => {
    mockRequest()
  })

  it('call the spotify albums endpoint', () => {
    const url = `${spotify.apiUrl}/me/albums?offset=0`
    const config = {
      headers: {
        Authorization: requestMock.headers['authorization']
      }
    }
    stubGet('success', albumsResponseMock)
    stubGetAlbumsHandler(requestMock, responseMock)
    expect(get).toBeCalledWith(url, config)
  })

  it('get hexadecimal colors from album cover', () => {
    stubGet('success', albumsResponseMock)
    stubGetAlbumsHandler(requestMock, responseMock)
    expect(responseMock.json).toBeCalledWith([
      {
        album: {
          images: [{ url: 'some-url.com' }],
          colors: ['#fff', '#000']
        }
      }
    ])
  })

  it('set the offset header', () => {
    stubGet('success', albumsResponseMock)
    stubGetAlbumsHandler(requestMock, responseMock)
    expect(responseMock.set).toBeCalledWith('Offset', '0')
  })

  it('handle a error when spotify albums endpoint send a error', () => {
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
    stubGet('error', err)
    stubGetAlbumsHandler(requestMock, responseMock)
    expect(responseMock.status).toBeCalledWith(err.response.data.error.status)
    expect(responseMock.json).toBeCalledWith({
      message: err.response.data.error.message
    })
  })
})
