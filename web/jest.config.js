module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  collectCoverage: true,
  coverageReporters: ['html', 'text-summary', 'lcov'],
  testMatch: ['**/*.spec.ts'],
  transformIgnorePatterns: ['node_modules/(?!@angular|@ngrx|rxjs)']
};
