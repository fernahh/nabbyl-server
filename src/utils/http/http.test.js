const axios = require('axios')
const { get, post } = require('./http')

describe('HTTP', () => {
  beforeEach(() => {
    spyOn(axios, 'post')
    spyOn(axios, 'get')
  })

  it('be hable to do a post request', () => {
    const url = 'http://nabil.com'
    const params = { foo: 'bar' }
    const config = { headers: 'some-header' }
    post(url, params, config)
    expect(axios.post).toBeCalledWith(url, params, config)
  })

  it('be hable to do a get request', () => {
    const url = 'http://nabil.com'
    const config = { headers: 'some-header' }
    get(url, config)
    expect(axios.get).toBeCalledWith(url, config)
  })
})
