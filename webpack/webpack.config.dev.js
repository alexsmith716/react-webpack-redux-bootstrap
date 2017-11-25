
const webpack = require('webpack');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
require('dotenv').config();
const autoprefixer = require('autoprefixer');

const PUBLIC_PATH = `/${process.env.PUBLIC_PATH || ''}/`.replace('//', '/');

console.log('>>>>>>> webpack.config.dev.js > process.env.NODE_ENV <<<<<<<<: ', process.env.NODE_ENV);
console.log('>>>>>>> webpack.config.dev.js > process.env.BABEL_DISABLE_CACHE <<<<<<<<: ', process.env.BABEL_DISABLE_CACHE);
console.log('>>>>>>> webpack.config.dev.js > PUBLIC_PATH <<<<<<<<: ', PUBLIC_PATH);

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: {
    app: [
      'eventsource-polyfill',
      'webpack-hot-middleware/client?reload=true',
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      'babel-polyfill',
      path.join(__dirname, '../client/assets/scss/global.scss'),
      path.join(__dirname, '../client/index.js')
    ],
    //vendor: ['react', 'redux', 'react-dom']
  },

  output: {
    path: __dirname,
    filename: '[name].js',
    publicPath: 'http://0.0.0.0:3000/',
  },

  module: {
    loaders: [
      {
        test: /\.jsx*$/,
        exclude: [/node_modules/, /.+\.config.js/],
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        include: [ path.join(__dirname, '../client/assets/scss') ],
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: false,
            }
          },
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: [ path.join(__dirname, '../client/assets/scss') ],
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                    browsers: ['last 2 versions','IE >= 9','safari >= 8'],
                }),
              ],
            },
          },
          {
            loader: 'sass-loader',
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                    browsers: ['last 2 versions','IE >= 9','safari >= 8'],
                }),
              ],
            },
          },
        ]
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
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/\/iconv-loader$/),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

    //new webpack.optimize.CommonsChunkPlugin({
    //  name: 'vendor',
    //  minChunks: Infinity,
    //  filename: '[name].[hash].js'
    //}),

    /*
    new webpack.DefinePlugin({
      'process.env': {
        CLIENT: JSON.stringify(true),
        NODE_ENV: JSON.stringify('development'),
        PUBLIC_PATH: JSON.stringify(PUBLIC_PATH),
        HOST: JSON.stringify(process.env.HOST),
        PROTOCOL: JSON.stringify(process.env.PROTOCOL),
        PORT: JSON.stringify(process.env.PORT)
      },
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true
    }),
    */

    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerPort: 8888,
      defaultSizes: 'parsed',
      openAnalyzer: false,
      generateStatsFile: false
    })
  ]
};
