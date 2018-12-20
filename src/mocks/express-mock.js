const RouterInstanceMock = {
  get: jest.fn()
}

const Router = jest.fn(() => RouterInstanceMock)

module.exports = { Router }
