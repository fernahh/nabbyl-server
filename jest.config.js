module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/!(server).js'],
  coverageDirectory: './coverage/',
  coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/src/mocks/'],
  coverageReporters: ['html'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  moduleNameMapper: {
    '@mocks/(.*)$': `<rootDir>/src/mocks/$1`
  },
  testEnvironment: 'node'
}
