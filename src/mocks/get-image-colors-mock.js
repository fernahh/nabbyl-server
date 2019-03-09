const colorsMock = [
  {
    hex: () => '#fff'
  },
  {
    hex: () => '#000'
  }
]

module.exports = jest.fn().mockReturnValue(Promise.resolve(colorsMock))
