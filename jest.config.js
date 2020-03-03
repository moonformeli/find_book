module.exports = {
  roots: ['<rootDir>/src'],
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  moduleDirectories: ['node_modules/', 'src'],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.json',
      diagnostics: false
    }
  }
};
