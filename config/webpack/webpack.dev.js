'use strict';

const webpackMerge = require('webpack-merge');
const webpackMergeDll = webpackMerge.strategy({plugins: 'replace'});
const DllBundlesPlugin = require('webpack-dll-bundles-plugin').DllBundlesPlugin;
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const commonConfig = require('./webpack.common');
const helpers = require('../helpers');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-source-map',
  entry: {
    main: './src/main.jit.ts'
  },
  output: {
    path: helpers.root('dist'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[file].map',
    chunkFilename: '[id].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\/css$/,
        use: ['to-string-loader', 'css-loader'],
        include: helpers.root('src/styles')
      },
      {
        test: /\.scss$/,
        use: ['to-string-loader', 'css-loader', 'sass-loader'],
        include: helpers.root('src/styles')
      }
    ]
  },
  plugins: [
    new DllBundlesPlugin({
      bundles: {
        polyfills: [
          'core-js',
          {
            name: 'zone.js',
            path: 'zone.js/dist/zone.js'
          },
          {
            name: 'zone.js',
            path: 'zone.js/dist/long-stack-trace-zone.js'
          },
        ],
        vendor: [
          '@angular/platform-browser',
          '@angular/platform-browser-dynamic',
          '@angular/core',
          '@angular/common',
          '@angular/forms',
          '@angular/http',
          '@angular/router',
          'rxjs',
        ]
      },
      dllDir: helpers.root('dll'),
      webpackConfig: webpackMergeDll(commonConfig, {
        devtool: 'cheap-module-source-map',
        plugins: []
      })
    }),
    new AddAssetHtmlPlugin([
      { filepath: helpers.root(`dll/${DllBundlesPlugin.resolveFile('polyfills')}`) },
      { filepath: helpers.root(`dll/${DllBundlesPlugin.resolveFile('vendor')}`) }
    ])
  ],
  devServer: {
    port: 3000,
    host: 'localhost',
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    stats: {
      cached: true,
      cachedAssets: true,
      chunks: true,
      chunkModules: false,
      colors: true,
      hash: false,
      reasons: true,
      timings: true,
      version: false
    }
  }
})
