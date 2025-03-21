// jest.config.js
module.exports = {
    moduleNameMapper: {
        '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    },
    testEnvironment: 'jsdom', // Use jsdom for DOM testing
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Include jest.setup.js
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest', // Use Babel for .js and .jsx files
    },
};