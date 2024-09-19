const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    generator: ['./src/components/header/index', './src/components/generator/index'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['generator'],
      title: 'Generator',
      template: './src/index.html',
      filename: 'index.html'
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
    clean: true,
  },
  resolve: {
    alias: {
      Src: path.resolve(__dirname, 'src/'),
      Components: path.resolve(__dirname, 'src/components/')
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