const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    generator: './src/index.js',
    schemes: './src/index.js',
    colors: './src/index.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Generator',
      template: './src/templates/index.html',
      chunks: ['generator'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Schemes',
      template: './src/templates/index.html',
      chunks: ['schemes'],
      filename: 'schemes.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Colors',
      template: './src/templates/index.html',
      chunks: ['colors'],
      filename: 'colors.html'
    })
  ],
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'public'),
    clean: true,
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    runtimeChunk: true,
    splitChunks: {
      chunks: 'async',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
}