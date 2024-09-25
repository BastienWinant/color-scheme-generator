const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = {
  entry: {
    index: './src/entries/index.js',
    schemes: './src/entries/schemes.js',
    colors: './src/entries/colors.js'
  },
  plugins: [
    new Dotenv(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/index.html',
      title: 'Generator',
      chunks: ['index'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/schemes.html',
      title: 'Schemes',
      chunks: ['schemes'],
      filename: 'schemes.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/colors.html',
      title: 'Colors',
      chunks: ['colors'],
      filename: 'colors.html'
    }),
  ],
  resolve: {
    alias: {
      Src: path.resolve(__dirname, 'src/'),
      Components: path.resolve(__dirname, 'src/components/'),
    },
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'public'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
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
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
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
}