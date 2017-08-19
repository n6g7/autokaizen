const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: ['babel-polyfill', './index.js'],
  resolve: {
    alias: {
      '@actions': path.resolve(__dirname, 'src/redux/actions'),
      '@services': path.resolve(__dirname, 'src/services')
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      }
    ]
  },
  devServer: {
    contentBase: './dist',
    historyApiFallback: true
  },
  plugins: [
    new Dotenv()
  ]
}
