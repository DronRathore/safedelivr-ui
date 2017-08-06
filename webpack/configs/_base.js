import webpack from 'webpack'
import config from '../../config'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import path from 'path'
import yamljs from 'yamljs'
var AssetsPlugin = require('assets-webpack-plugin');

const env = process.env.NODE_ENV

const cdn = config.get('appConfig').cdn_path

const paths = config.get('utils_paths')
const srcDir = config.get('dir_src')

const webpackConfig = {
  name: 'app',
  target: 'web',
  entry: {
    app: [`${srcDir}/app.js`],
    indexView: [`${srcDir}/views/indexView.js`],
    dashboardView: [`${srcDir}/views/dashboardView.js`],
    logView: [`${srcDir}/views/logView.js`],
    mailView: [`${srcDir}/views/mailView.js`],
    vendor: config.get('vendor_dependencies')
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: config.get('dir_dist'),
    publicPath: `${cdn}/`
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['app', 'vendor', 'manifest'],
      minChunks: Infinity
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin(config.get('globals')),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new AssetsPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css'],
    modules: ['node_modules'],
    alias : config.get('aliases'),
    mainFields: ['main', 'web']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            cacheDirectory: true,
            plugins: ['transform-runtime'],
            presets: [
              [
                'latest',
                {
                  es2015: {
                    modules: false
                  }
                }
              ],
              'react',
              'stage-0'
            ],
            env: {
              production: {
                plugins: ['transform-react-remove-prop-types']
              },
              development: {
                presets: ['react-hmre']
              }
            }
          }
        }
      },

      {
        test: /\w*\.ttf(\?.*)?$/,
        use: {
          loader: "url-loader",
          options: {
            mimetype: 'application/octet-stream'
          }
        }
      },
      {
        test: /\w*\.woff(\?.*)?$/,
        use: {
          loader: "url-loader",
          options: {
            mimetype: 'application/font-woff'
          }
        }
      },
      {
        test: /\w*\.woff2(\?.*)?$/,
        use: {
          loader: "url-loader",
          options: {
            mimetype: 'application/font-woff2'
          }
        }
      },
      {
        test: /\w*\.eot(\?.*)?$/,
        use: {
          loader: "url-loader",
          options: {
            mimetype: 'application/octet-stream'
          }
        }
      },
      {
        test: /\w*\.svg(\?.*)?$/,
        use: {
          loader: "url-loader",
          options: {
            mimetype: 'image/svg+xml'
          }
        }
      },

      {
        test: /\.png$/,
        use: {
          loader: 'url-loader',
          options: {
            mimetype: 'image/png'
          }
        }
      },

      {
        test: /\.jpg$/,
        use: {
          loader: 'url-loader',
          options: {
            mimetype: 'image/jpg'
          }
        }
      },

      {
        test: /\.gif/,
        use: {
          loader: 'url-loader',
          options: {
            mimetype: 'image/gif'
          }
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [config.get('styles')]
              }
            }
          ]
        })
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules'
        ]
      }
    ]
  }
}
if (env !== 'production') {
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
}
export default webpackConfig
