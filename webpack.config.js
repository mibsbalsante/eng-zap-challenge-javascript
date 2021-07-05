const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env, { mode }) => {
  const devMode = mode !== 'production'

  return {
    devtool: devMode ? 'eval' : 'source-map',
    entry: path.resolve(__dirname, './src/index.js'),
    mode,
    module: {
      rules: [
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: {
                  localIdentName: devMode ? '[local]' : '[local]__[hash:base64:5]',
                },
              },
            },
            'postcss-loader',
          ],
        },
        {
          test: /\.css$/,
          include: /node_modules/,
          exclude: /src/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.html$/,
          use: {
            loader: 'html-loader',
          },
        },
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: { loader: 'babel-loader' },
        },
      ],
    },
    optimization: {
      minimizer: [`...`, new CssMinimizerPlugin()],
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'index__[contenthash].js',
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name]__[contenthash].css',
        chunkFilename: '[id]__[contenthash].css',
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './public/index.html'),
        filename: './index.html',
      }),
    ],
    resolve: {
      alias: {
        '@comp': path.resolve(__dirname, 'src/components'),
      },
    },
  }
}
