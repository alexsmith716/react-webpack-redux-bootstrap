
console.log('>>>>>>> index.js > process.env.NODE_ENV <<<<<<<<: ', process.env.NODE_ENV);
console.log('>>>>>>> index.js > process.env.BABEL_DISABLE_CACHE <<<<<<<<: ', process.env.BABEL_DISABLE_CACHE);

if (process.env.NODE_ENV === 'production') {

  require('./build/server/server.bundle');

} else {

  console.log('>>>>>>> index.js 11111111 <<<<<<<<');

  require('babel-register')({
    plugins: [
      ['babel-plugin-css-modules-transform', {
        preprocessCss: './loaders/sassLoader.js',
        generateScopedName: '[name]__[local]__[hash:base64:5]',
        extensions: ['.css', '.scss']
      }],
      ['babel-plugin-webpack-loaders', {
        config: './webpack/webpack.config.babel.js',
        verbose: true
      }]
    ]
  });

  console.log('>>>>>>> index.js 222222222 <<<<<<<<');

  require('babel-polyfill');
  require('./server/server');
}
