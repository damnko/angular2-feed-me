'use strict';

const AssetsPlugin = require('assets-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const Dotenv = require('dotenv-webpack');

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
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.css$/,
        use: ['to-string-loader', 'css-loader'],
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
      /*
      {
        // I could use this configuration to copy and compress images
        // but I should use `import '../assets/img/imagename.jpg'` for each image I use
        // it is probably better to simply copy all the assets folder
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/img/[name].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                quality: 65
              },
              pngquant:{
                quality: "10-20",
                speed: 4
              },
              svgo:{
                plugins: [
                  {
                    removeViewBox: false
                  },
                  {
                    removeEmptyAttrs: false
                  }
                ]
              },
              gifsicle: {
                optimizationLevel: 7,
                interlaced: false
              },
              optipng: {
                optimizationLevel: 7,
                interlaced: false
              }
            }
          }
        ]
      },
      */
      {
        test: /\.(png|jpe?g|gif|eot|ico)$/,
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
      path: helpers.root('dist'),
      filename: 'webpack.assets.json',
      prettyPrint: true
    }),
    new CheckerPlugin(),
    new CommonsChunkPlugin({
      name: ['polyfills', 'vendor', 'main'].reverse()
    }),
    new CopyWebpackPlugin([
      { from: 'src/assets', to: 'assets' }
    ]),
    new ImageminPlugin({
      disable: !PROD,
      mozjpeg: {
        quality: 65
      },
      pngquant:{
        quality: "10-20",
        speed: 4
      },
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false
      },
      optipng: {
        optimizationLevel: 7,
        interlaced: false
      }
    }),
    // // Workaround for angular/angular#11580
    // new ContextReplacementPlugin(
    //   // The (\\|\/) piece accounts for path separators in *nix and Windows
    //   // https://github.com/angular/angular.io/issues/3514
    //   /angular(\\|\/)core(\\|\/)@angular/,
    //   helpers.root('src'), // location of your src
    //   {} // a map of your routes
    // ),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      title: METADATA.title,
      chunksSortMode: 'dependency',
      metadata: METADATA,
      inject: 'head'
    }),
    new Dotenv()
    // add "defer" attribute to scripts in index.html
    // new ScriptExtHtmlWebpackPlugin({
    //   defaultAttribute: 'defer'
    // })
  ]
}
