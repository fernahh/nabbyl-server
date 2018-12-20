const stringify = require('./stringify')
const querystring = require('querystring')

jest.mock('querystring')

describe('Stringify', () => {
  const mockQuerystring = () => {
    querystring.stringify = jest.fn().mockReturnValue('id=abcdef')
  }

  it('get the serialized value', () => {
    mockQuerystring()
    const params = { id: 'abcdef' }
    const result = stringify(params)
    expect(querystring.stringify).toBeCalledWith(params)
    expect(result).toEqual('id=abcdef')
  })
})
