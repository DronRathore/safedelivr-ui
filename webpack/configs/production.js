import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import webpackConfig from './_base'
import CompressionPlugin from 'compression-webpack-plugin'
import path from 'path'

const branch = process.env.BRANCH_NAME
if (branch) {
  webpackConfig.recordsPath = path.resolve(
    __dirname,
    `../../tmp/webpack_config/${branch.replace(
      /[/.@]/g,
      '-'
    )}/webpack-records.json`
  )
} else {
  console.log('Required: BRANCH_NAME environment variable')
}

webpackConfig.output.filename = '[name].[chunkhash].js'
webpackConfig.output.chunkFilename = '[name].[chunkhash].js'

webpackConfig.plugins.push(
  new ExtractTextPlugin({
    filename: '[name].[contentHash].css',
    disable: false,
    allChunks: true
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  // new webpack.optimize.ModuleConcatenationPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    mangle: true,
    comments: false,
    compress: {
      sequences: true,
      dead_code: true,
      conditionals: true,
      booleans: true,
      unused: true,
      if_return: true,
      join_vars: true,
      drop_console: true,
      warnings: false
    }
  }),
  new CompressionPlugin({
    asset: '[file].gz',
    algorithm: 'gzip',
    regExp: /\.js$|\.html$|\.css$/,
    threshold: 1024,
    minRatio: 0.9
  })
)

export default webpackConfig