'use strict';

const webpack = require('webpack');
const path = require('path');
const pkg = require('./package.json');

const dist = path.resolve(__dirname, 'dist/');
const test = path.resolve(__dirname, 'test/');

const isWatch = process.argv[1].indexOf('webpack-dev-server.js') > -1;

module.exports = {
  entry: './app/index.js',

  output: {
    filename: 'dataTabs.js',
    path: dist
  },

  watch: isWatch,

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new webpack.BannerPlugin(`dataTabs v${pkg.version}\nhttps://github.com/VladimirIvanin/dataTabs/`)
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      }
    ]
  },

  devServer: {
    contentBase: test,
    hot: true,
    inline: true
  }
};
