const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const { join, resolve } = require('path')

let localConfig = {}
try {
  localConfig = require(`${process.cwd()}/config/webpack.config`)
} catch (error) {}

const PATH = resolve(require('../lib/utils/config').static)

module.exports = Object.assign(
  {
    entry: {
      common: ['jquery', 'cookie'],
      index: [join(PATH, 'js', 'index')]
    },
    output: {
      path: '/build/js',
      filename: '[name].js',
      publicPath: '/js',
      chunkFilename: '[name].js'
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        filename: 'common.js',
        minChunks: Infinity
      })
    ],
    resolve: {
      modules: [
        join(PATH, 'js'),
        join(__dirname, '..', 'node_modules'),
        'node_modules'
      ],
      alias: {
        cookie: 'js-cookie'
      }
    },
    resolveLoader: {
      modules: [join(__dirname, '..', 'node_modules'), 'node_modules']
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|common)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  // join(__dirname, '..', 'node_modules', 'babel-preset-env'),
                  require('babel-preset-env'),
                  {
                    loose: true,
                    modules: false
                  }
                ]
              ],
              plugins: []
            }
          }
        },
        {
          test: require.resolve('jquery'),
          use: [
            {
              loader: 'expose-loader',
              query: 'jQuery'
            },
            {
              loader: 'expose-loader',
              query: '$'
            }
          ]
        },
        {
          test: require.resolve('js-cookie'),
          use: [
            {
              loader: 'expose-loader',
              query: 'Cookie'
            }
          ]
        }
      ]
    },
    devtool: '#source-map'
  },
  localConfig
)

if (process.env.NODE_ENV === 'development') {
  module.exports.plugins.push(
    new UglifyJSPlugin({
      uglifyOptions: {
        ie8: true
      },
      output: {
        comments: false
      }
    })
  )
}
