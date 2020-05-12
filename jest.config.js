module.exports = {
  testRegex: '(/__test__/.*|(\\.|/)spec)\\.ts$',
  testPathIgnorePatterns: ['/node_modules/', '/sandbox/', '/fixtures/'],
  preset: 'ts-jest',
  testEnvironment: 'node',
};
