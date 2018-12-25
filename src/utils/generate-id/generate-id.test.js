const generateID = require('./generate-id')
const nanoid = require('nanoid')

jest.mock('nanoid')

describe('Generate ID', () => {
  const mockNanoid = () => {
    nanoid.mockImplementation(() => 'abcdef')
  }

  it('get some random value', () => {
    mockNanoid()
    const id = generateID()
    expect(id).toEqual('abcdef')
    expect(nanoid).toBeCalled()
  })
})
