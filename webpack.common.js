const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './client/src/index.js',
  output: {
    filename: 'responsivetable.js',
    // The output directory as an absolute path
    path: path.resolve(__dirname, 'client/dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
              publicPath: '/resources/vendor/dnadesign/silverstripe-elemental-responsivetable/client/dist/fonts',
            },
          },
        ],
      },
      {
        // Inline lightweight SVGs as UTF-8 encoded DataUrl string
        // The result is smaller and faster to parse than base64
        test: /\.svg(\?.*)?$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10 * 1024,
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: '/resources/vendor/dnadesign/silverstripe-elemental-responsivetable/client/dist/images',
            },
          },
          {
            loader: 'svg-transform-loader',
          },
        ],
      },
      {
        // Inline lightweight images as Base64 encoded DataUrl string
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: '/resources/vendor/dnadesign/silverstripe-elemental-responsivetable/client/dist/images',
            },
          },
          // Pass images through optimisers
          {
            loader: 'image-webpack-loader',
          },
        ],
      },
    ],
  },
};
