/*eslint-disable */
var webpack = require('webpack')
var path = require('path')

var PRODUCTION = process.env.NODE_ENV === 'production'

if (!PRODUCTION) {
  require('dotenv').config({ silent: true })
}

var replace = {};
for (var key in process.env) {
  if (process.env.hasOwnProperty(key)) {
    replace["process.env." + key] = '"' + process.env[key] + '"';
  }
}

var plugins = [ new webpack.DefinePlugin(replace) ]

var productionPlugins = [
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
]

var developmentPlugins = [
  new webpack.HotModuleReplacementPlugin()
]

var loaders = [{
  test: /\.jsx?$/,
  loader: 'babel-loader',
  include: path.join(__dirname, 'src'),
  exclude: /node_modules/
}]

module.exports = {
  cache: !PRODUCTION,
  resolve: {
    extensions: [ '.js' ],
    alias: {
      'redux-fluorine': path.resolve(__dirname, '../..')
    }
  },
  entry: [ './src/index' ],
  devtool: 'source-map',
  plugins: plugins
    .concat(PRODUCTION ? productionPlugins : developmentPlugins),
  module: {
    loaders: loaders
  },
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'bundle.js',
    publicPath: '/static/'
  }
}
