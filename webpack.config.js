// Import external libraries
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// Define our compiled asset files
const jsOutputTemplate = 'javascripts/application.js'
const cssOutputTemplate = 'stylesheets/application.css'

module.exports = {
  // Remove this if you are not using Docker
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/
  },

  // Define our asset directory
  context: path.join(__dirname, '/app/assets'),

  // What js / CSS files should we read from and generate
  entry: {
    application: ['bootstrap-loader', './javascripts/application.js', './stylesheets/application.sass']
  },

  // Define where to save assets to
  output: {
    path: path.join(__dirname, '/public'),
    filename: jsOutputTemplate
  },

  // Define how different file types should be transpiled
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react']
      }
    },
    { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports-loader?jQuery=jquery' },
    { test: /\.css$/, loaders: ExtractTextPlugin.extract('css-loader') },
    { test: /\.sass$/, loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']) },
    { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000&name=/fonts/[name].[ext]' },
    { test: /\.(ttf|eot)$/, loader: 'file-loader?name=/fonts/[name].[ext]' }]
  },

  plugins: [
    new ExtractTextPlugin({ filename: cssOutputTemplate, allChunks: true }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
}
