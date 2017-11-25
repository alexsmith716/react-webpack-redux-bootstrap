const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsConfig = require('./webpack.config.isomorphic');
const path = require('path');
const autoprefixer = require('autoprefixer');

console.log('>>>>>>> webpack.config.prod.js > process.env.NODE_ENV <<<<<<<<: ', process.env.NODE_ENV);

module.exports = {

  devtool: 'source-map',

  entry: {
    app: [
      'eventsource-polyfill',
      'babel-polyfill',
      'isomorphic-fetch',
      path.join(__dirname, './client/assets/scss/global.scss'),
      path.join(__dirname, './client/index.js')
    ],
    vendor: ['react', 'redux', 'react-dom']
  },

  output: {
    path: path.join(__dirname, './public/static/dist/client'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/public/static/dist/client/'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css'],
    modules: ['client', 'node_modules']
  },

  module: {
    loaders: [
      {
        test: /\.jsx*$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        include: [ path.resolve(__dirname, 'client/assets/scss') ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: false,
              }
            },
            {
              loader: 'resolve-url-loader'
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              }
            }
          ]
        })
      },
      {
        test: /\.scss$/,
        exclude: [ path.resolve(__dirname, 'client/assets/scss') ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]__[local]__[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  autoprefixer({
                      browsers: ['last 2 versions','IE >= 9','safari >= 8']
                  }),
                ],
              },
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]__[local]__[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  autoprefixer({
                      browsers: ['last 2 versions','IE >= 9','safari >= 8']
                  }),
                ],
              },
            },
          ]
        })
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        }],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        }],
      },
      {
        test: /\.json$/,
        use: [{
          loader: 'json-loader',
        }]
      },
    ],
  },

  plugins: [
    new webpack.IgnorePlugin(/\/iconv-loader$/),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        CLIENT: JSON.stringify(true)
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: '[name].[chunkhash].js'
    }),

    new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig),

    new ExtractTextPlugin({
      filename: '[name].[chunkhash].css'
    }),

    new ManifestPlugin({
      basePath: '/'
    }),

    new ChunkManifestPlugin({
      filename: 'chunk-manifest.json',
      manifestVariable: 'webpackManifest'
    }),

    new SWPrecacheWebpackPlugin({
      cacheId: 'gost',
      filename: 'sw.js',
      filepath: path.join(__dirname, './dist/sw.js'),
      staticFileGlobs: [path.join(__dirname, './public/static/dist/**/*')],
      staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
      maximumFileSizeToCacheInBytes: 4194304,
      navigateFallback: 'index.html'
    })
  ]
};

/*
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
          }
        }]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'image/svg+xml',
          }
        }]
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/octet-stream',
            name: '[name].[ext]',
          }
        }]
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/vnd.ms-fontobject',
          }
        }]
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          }
        }]
      },
*/
