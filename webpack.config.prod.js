const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
// const Dotenv = require('dotenv-webpack');


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
  mode:"production",
  node: {
    __dirname: false,
    __filename: false,
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist')
  },
  externals: [
    /^[a-z\-0-9]+$/ // Ignore node_modules folder
  ],
  optimization: {
    minimize: true //Update this to true or false
  },
  devtool: 'source-map',
  watch: false,
  plugins: [
    /*new Dotenv({
      path: "./.env.prod",
      safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: true, // hide any errors
      defaults: false
    })*/
  ],
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
        controllers: path.resolve(__dirname, 'src/api/controllers/'),
        models: path.resolve(__dirname, 'src/api/models/'),
        services: path.resolve(__dirname, 'src/api/services/'),
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