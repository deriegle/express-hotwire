module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch:[
    "**/?(*.)+(spec|test).[jt]s?(x)"
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/example/',
    '/build/',
  ]
};