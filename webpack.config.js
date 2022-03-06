const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const NodemonPlugin = require('nodemon-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin'); 

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: './src/app.ts',
  target: 'node',
  mode:"development",
  node: {
    __dirname: false,
    __filename: false,
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'build')
  },
  optimization: {
    minimize: false //Update this to true or false
  },
  devtool: 'source-map',
  plugins: [
  new ESLintPlugin({
    files: 'src/**/*.ts',
    emitError: true,
    failOnWarning: false,
    fix: true
  }),
  new NodemonPlugin()
  ],
  watchOptions: {
    poll: false,
    ignored: /node_modules/
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
        controllers: path.resolve(__dirname, 'src/api/controllers/'),
        models: path.resolve(__dirname, 'src/api/models/'),
        entities: path.resolve(__dirname, 'src/api/entities'),
        services: path.resolve(__dirname, 'src/api/services'),
        middlewares: path.resolve(__dirname, 'src/api/middlewares/'),
        config: path.resolve(__dirname, 'src/config'),
        responses: path.resolve(__dirname, 'src/api/responses'),
    }
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  externals: nodeModules
};