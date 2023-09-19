module.exports = {
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    setupFilesAfterEnv: ['./src/setupTests.js'],
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    // Add this line to specify the Babel configuration file
  };