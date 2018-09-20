const path = require('path')
const webpack = require('webpack')
const webpackNodeExternals = require('webpack-node-externals')

module.exports = {
  entry: {
    'index': './index.js'
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['react', ['env', { targets: { node: '8.11.1' } }]],
            compact: false,
          },
        },
      },
      {
        test: /\.(otf)$/,
        use: {
          loader: 'url-loader',
          options: {
            mimetype: 'application/x-font-otf',
            limit: 10*1000*1000, // 10MB
          },
        },
      },
    ],
  },
  externals: [webpackNodeExternals()],
}
