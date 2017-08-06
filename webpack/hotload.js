import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import config from '../config';
import webpackConfig from './configs/dev';
import webpackHot from 'webpack-hot-middleware';

const compiler = webpack(webpackConfig);
const webpackDevMiddleware = new webpackMiddleware(compiler, {
  contentBase: require('path').resolve(__dirname, "../src/"),
  hot: true,
  quiet: false,
  noInfo: false,
  lazy: false,
  stats: {
    assets: true,
    colors: true,
    version: true,
    hash: true,
    timings: true,
    chunks: false,
    chunkModules: false
  },
  publicPath: '/',
  historyApiFallback: true,
  host: process.env.HOST ? process.env.HOST: 'localhost'
});

const webpackHotMiddleware = new webpackHot(compiler, {log: console.log})

export default {
  webpackDevMiddleware: webpackDevMiddleware,
  webpackHotMiddleware: webpackHotMiddleware
}