var WebpackDevServer = require('webpack-dev-server')
var webpack = require('webpack')
var config = require('./webpack.config')

var port = process.env.PORT || 8080

config.watch = true
config.entry = [
  'react-hot-loader/patch',
  'webpack-dev-server/client?http://localhost:' + port,
  'webpack/hot/only-dev-server'
].concat(config.entry)

var compiler = webpack(config)
var server = new WebpackDevServer(compiler, {
  publicPath: config.output.publicPath,

  hot: true,
  historyApiFallback: true,
  noInfo: false,
  quiet: false,
  stats: {
    version: true,
    timings: true,
    modules: false,
    errorDetails: true,
    chunkModules: false,
    colors: true
  }})

server.listen(port, 'localhost', function() {
  console.log('☕️  Server is listening on localhost:' + port);
})
