const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const Dotenv = require('dotenv-webpack')

const devMode = process.env.NODE_ENV !== 'production'
const env_file = process.env.NODE_ENV == 'production' ? './.prod.env' : './.dev.env'

module.exports = {
  entry: {
    index: ['./src/index', './src/components/header/index'],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        // extract all CSS in a single file
        styles: {
          name: 'styles',
          type: 'css/mini-extract',
          chunks: 'all',
          enforce: true,
        },
        // extract third-party libraries
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new Dotenv({
      path: env_file
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      title: 'Color Scheme Generator',
      template: './src/assets/templates/index.html',
      chunks: ['index'],
      filename: 'index.html'
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
  resolve: {
    alias: {
      Src: path.resolve(__dirname, 'src/'),
      Components: path.resolve(__dirname, 'src/components/'),
    },
  },
};