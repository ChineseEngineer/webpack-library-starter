/* global __dirname, require, module */

const webpack = require('webpack')
const path = require('path')
const env = require('yargs').argv.env // use --env with webpack 2
const pkg = require('./package.json')

let libraryName = pkg.name

let outputFile, mode, sourceMap

if (env === 'build') {
  mode = 'production'
  sourceMap = false
  outputFile = libraryName + '.min.js'
} else {
  mode = 'development'
  sourceMap = 'inline-source-map'
  outputFile = libraryName + '.js'
}

const config = {
  mode: mode,
  entry: `${__dirname}/src/index.js`,
  devtool: sourceMap,
  output: {
    path: `${__dirname}/lib`,
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: "typeof self !== 'undefined' ? self : this"
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js']
  }
}

module.exports = config
