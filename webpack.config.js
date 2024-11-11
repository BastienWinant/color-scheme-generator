const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = (env) => {
  const devMode = env.WEBPACK_SERVE

  return {
    mode: devMode ? 'development' : 'production',
    devtool: devMode ? 'inline-source-map': false,
    devServer: {
      static: './dist',
      hot: true,
    },
    entry: {
      index: ['./src/index', './src/components/header', './src/components/generator'],
      schemes: ['./src/index', './src/components/header'],
      colors: ['./src/index', './src/components/header', './src/components/colors']
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
      new HtmlWebpackPlugin({
        title: 'Generator',
        template: './src/assets/templates/index.html',
        chunks: ['index'],
        filename: 'index.html'
      }),
      new HtmlWebpackPlugin({
        title: 'Schemes',
        template: './src/assets/templates/schemes.html',
        chunks: ['schemes'],
        filename: 'schemes.html'
      }),
      new HtmlWebpackPlugin({
        title: 'Colors',
        template: './src/assets/templates/colors.html',
        chunks: ['colors'],
        filename: 'colors.html'
      }),
    ].concat(devMode ? [] : [
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
        chunkFilename: "[id].[contenthash].css",
      }),
    ]),
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'public'),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader"
          ],
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
  }
}