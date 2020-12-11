module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    'module:react-native-dotenv',
  ],
  plugins: [
    [
      'babel-plugin-root-import',
      {
        rootPathSuffix: 'src',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        alias: {
              '@home': './src'
            }
      },
    ],
  ],
  env: {
    production: {
      plugins: [
        [
          'babel-plugin-root-import',
          {
            rootPathSuffix: 'src',
            extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
            alias: {
              '@home': './src'
            }
          },
        ],
      ],
    },
  },
};
