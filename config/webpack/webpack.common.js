'use strict';

const AssetsPlugin = require('assets-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const helpers = require('../helpers');

const PROD = process.env.NODE_ENV === 'production';

const METADATA = {
  title: 'An Angular2 app to explore nutrients, ingredients and recipes',
  baseUrl: '/'
}

module.exports = {
  entry: {
    polyfills: './src/polyfills.ts',
    vendor: './src/vendor.ts'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: [helpers.root('src'), helpers.root('node_modules')]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: 'tsconfig.json' }
          } , 'angular2-template-loader'
        ]
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.css$/,
        use: ['to-string-loader', 'css-loader'],
        // styles.scss will hold the global styles
        exclude: [helpers.root('src/styles')]
      },
      {
        test: /\.scss$/,
        use: ['to-string-loader', 'css-loader', 'sass-loader'],
        exclude: [helpers.root('src/styles')]
      },
      {
        test: /\.html$/,
        use: 'raw-loader',
        exclude: [helpers.root('src/index.html')]
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: 'file-loader'
      },
      {
        test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new AssetsPlugin({
      // where to save the fil
      path: helpers.root('dist'),
      filename: 'webpack.assets.json',
      prettyPrint: true
    }),
    new CheckerPlugin(),
    new CommonsChunkPlugin({
      name: ['polyfills', 'vendor', 'main'].reverse()
    }),
    // Workaround for angular/angular#11580
    new ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      // https://github.com/angular/angular.io/issues/3514
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('src'), // location of your src
      {} // a map of your routes
    ),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      title: METADATA.title,
      chunksSortMode: 'dependency',
      metadata: METADATA,
      inject: 'head'
    }),
    // add "defer" attribute to scripts in index.html
    // new ScriptExtHtmlWebpackPlugin({
    //   defaultAttribute: 'defer'
    // })
  ]
}
