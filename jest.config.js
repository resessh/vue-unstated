module.exports = {
  preset: 'ts-jest',
  globals: { 'ts-jest': { tsConfig: './tsconfig.test.json' } },
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
};
