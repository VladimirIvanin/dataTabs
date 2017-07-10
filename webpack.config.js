'use strict';

const webpack = require('webpack');
const path = require('path');

const dist = path.resolve(__dirname, 'dist/');
const test = path.resolve(__dirname, 'test/');

module.exports = {
  entry: './app/index.js',

  output: {
    filename: 'dataTabs.js',
    path: dist
  },

  watch: true,

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new webpack.BannerPlugin('dataTabs v0.8.0\nhttps://github.com/VladimirIvanin/dataTabs/')
  ],

  module: {

    loaders: [{
      test:    /\.js$/,
      loader:  "babel-loader?presets[]=es2015"
    }]

  },

  devServer: {
    contentBase: test,
    hot: true,
    inline: true
  }
};
