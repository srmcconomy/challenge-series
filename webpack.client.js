'use strict'; // eslint-disable-line strict

// Import modules
const webpack = require('webpack');
const path = require('path');

const config = require('./config');

module.exports = {
  target: 'web',
  cache: true,
  context: __dirname,
  devtool: 'none',
  debug: false,
  entry: [config.files.client.entry],

  output: {
    path: path.join(__dirname, config.files.staticAssets, config.files.client.out),
    filename: config.files.client.outFile,
    chunkFilename: '[name].[id].js',
    publicPath: '/assets/js/',
  },

  externals: {
    'source-map-support': null,
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') },
      __CLIENT__: true,
      __SERVER__: false,
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ],

  babel: config.build.babel.client.prod,

  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['babel-loader'], include: [path.resolve(__dirname, 'src')] },
      { test: /\.json$/, loaders: ['json'] },
    ],
  },

  node: {
    fs: 'empty',
    buffer: 'empty',
    util: 'empty',
    events: 'empty',
    assert: 'empty',
  },

  resolve: {
    extensions: ['', '.jsx', '.js'],
  },

};
