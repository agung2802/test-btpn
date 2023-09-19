module.exports = {
    presets: [
      '@babel/preset-env',
      '@babel/preset-react', // Add this line
    ],
    setupFilesAfterEnv: ['./jest.setup.js'],
  };
  