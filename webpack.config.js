const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devServer: {
    contentBase: [path.join(__dirname, 'dist'), path.join(__dirname, 'assets')],
    contentBasePublicPath: ['/', '/assets'],
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: false }],
              ['@babel/plugin-proposal-class-properties']
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin(['API_URL']),
    new HtmlWebpackPlugin({ base: process.env.NODE_ENV == 'development'?'/':'/europes/' }),
  ],
}
