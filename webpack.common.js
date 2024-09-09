const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    generator: ['./src/index', './src/app', './src/components/header/index'],
    schemes: ['./src/index', './src/app', './src/components/header/index'],
    colors: ['./src/index', './src/app', './src/components/header/index']
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ["generator"],
      filename: 'index.html',
      template: './src/index.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ["schemes"],
      filename: 'schemes.html',
      template: './src/index.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ["colors"],
      filename: 'colors.html',
      template: './src/index.html'
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
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