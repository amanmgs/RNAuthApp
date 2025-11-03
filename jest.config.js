module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|react-clone-referenced-element|@react-native-community|@react-native-masked-view|react-native-size-matters)',
  ],
  setupFilesAfterEnv: ['./jestSetup.js'], // ✅ change this
};
