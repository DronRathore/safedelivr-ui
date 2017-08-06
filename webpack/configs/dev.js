var webpack = require("webpack")
var webpackConfig = require("./_base")
var ExtractTextPlugin = require('extract-text-webpack-plugin')
webpackConfig.devtool = 'source-map'

webpackConfig.default.plugins.push(
	new webpack.HotModuleReplacementPlugin(),
	new ExtractTextPlugin({
    filename: '[name].css',
    disable: false,
    allChunks: true
  }))
module.exports = webpackConfig