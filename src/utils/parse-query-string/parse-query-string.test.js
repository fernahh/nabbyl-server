const parseQueryString = require('./parse-query-string')
const querystring = require('querystring')

jest.mock('querystring')

describe('Parse Query String', () => {
  const mockQuerystringParse = () => {
    querystring.parse = jest.fn().mockReturnValue({ id: 1})
  }

  it('get object with query values', () => {
    mockQuerystringParse()
    const query = 'id=1'
    const result = parseQueryString(query)
    expect(querystring.parse).toBeCalledWith(query)
    expect(result).toEqual({ id: 1})
  })
})
