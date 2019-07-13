module.exports = {
  preset: 'react-native',
  collectCoverage: true,
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    //'^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
    '^.+\\.js$': '<rootDir>//internals/testing/preprocessor.js',
  },
  setupFiles: ['<rootDir>/internals/testing/setup-tests.js'],
  transformIgnorePatterns: ['node_modules/(?!(jest-)?react-native)'],
  coveragePathIgnorePatterns: ['/node_modules/', '/jest'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
