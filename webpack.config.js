const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var cssAllMap = require("./assets/sass/cssAllMap.json");
module.exports = {
  entry: cssAllMap.compile,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].[chunkhash].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        loaders: [
          'css-loader', 'resolve-url-loader',
          'sass-loader?includePaths[]=' + path.resolve(__dirname, 'node_modules') +
          '&includePaths[]=' + path.resolve(__dirname, 'bower_components') +
          '&includePaths[]=' + path.resolve(__dirname, 'libs')
          // tells sass-loader to look in these dirs when resolving files
        ]
      },
      {
        test: /.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      },
      { // sass / scss loader for webpack
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract([
          'css-loader?minimize', 'resolve-url-loader', 'sass-loader'
        ])
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({ // define where to save the file
      path: path.join(__dirname, '/dist'),
      filename: '[name].[chunkhash].css'
    })
  ]
};
