'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './app/index.js',

  output: {
    filename: 'datatabs.js',
    path: path.resolve(__dirname, 'dist')
  },

  watch: true,

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
  ],

  module: {

    loaders: [{
      test:    /\.js$/,
      loader:  "babel-loader?presets[]=es2015"
    }]

  },

  devServer: {
    contentBase: __dirname + '/test/',
    hot: true,
    inline: true
  }
};
