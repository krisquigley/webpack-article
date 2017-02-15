// Import external libraries
const fs = require('fs')
const path = require('path')

// Capture watchmode argument
const watchMode = process.argv.indexOf('-w') !== -1 || process.argv.indexOf('--watch') !== -1;

// Define our compiled asset files
const jsOutputTemplate = 'javascripts/application.js'

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
    application: './javascripts/application.js'
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
        presets: ['es2015']
      }
    }]
  },

  plugins: [
    function () {
      if (!watchMode) {
        // delete previous output of compiled assets
        this.plugin('compile', function () {
          let basepath = path.join(__dirname, '/public')
          let paths = ['/javascripts', '/stylesheets']

          for (let x = 0; x < paths.length; x++) {
            const assetPath = path.join(basepath, paths[x])

            fs.readdir(assetPath, function (err, files) {
              if (files === undefined) {
                return
              } else if (err) {
                console.log(err)
              }

              for (let i = 0; i < files.length; i++) {
                fs.unlinkSync(path.join(assetPath, '/', files[i]))
              }
            })
          }
        })
      }
    }
  ]
}
