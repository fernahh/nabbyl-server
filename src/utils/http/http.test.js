const axios = require('axios')
const { post } = require('./http')

describe('HTTP', () => {
  beforeEach(() => {
    spyOn(axios, 'post')
  })
  
  it('be hable to do a post request', () => {
    const url = 'http://nabil.com'
    const params = { foo: 'bar' }
    const config = { headers: 'some-header' }
    post(url, params, config)
    expect(axios.post).toBeCalledWith(url, params, config)
  })
})
