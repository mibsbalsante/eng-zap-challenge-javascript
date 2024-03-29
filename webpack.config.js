const path = require('path')

const Dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env, { mode }) => {
  const devMode = mode !== 'production'

  return {
    devServer: {
      historyApiFallback: true,
    },
    devtool: devMode ? 'eval' : 'source-map',
    entry: path.resolve(__dirname, './src/index.js'),
    mode,
    module: {
      rules: [
        {
          test: /\.css$/,
          include: [/node_modules/, /src\/assets/],
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.css$/,
          exclude: [/node_modules/, /src\/assets/],
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: {
                  localIdentName: '[local]__[hash:base64:5]',
                },
              },
            },
            'postcss-loader',
          ],
        },
        {
          test: /\.html$/,
          use: {
            loader: 'html-loader',
          },
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: { loader: 'babel-loader' },
        },
        {
          test: /\.(jpg|png|gif|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'img/',
                publicPath: '/img/',
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/',
                publicPath: '/fonts/',
              },
            },
          ],
        },
      ],
    },
    optimization: {
      minimizer: [`...`, new CssMinimizerPlugin()],
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: '/',
      filename: 'index__[contenthash].js',
    },
    plugins: [
      new Dotenv({
        systemvars: true,
      }),
      new MiniCssExtractPlugin({
        filename: '[name]__[contenthash].css',
        chunkFilename: '[id]__[contenthash].css',
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './public/index.html'),
        filename: './index.html',
        favicon: './src/assets/img/favicon.jpg',
      }),
    ],
    resolve: {
      alias: {
        '@config': path.resolve(__dirname, 'src/config'),
        '@context': path.resolve(__dirname, 'src/context'),
        '@comp': path.resolve(__dirname, 'src/components'),
        '@font': path.resolve(__dirname, 'src/assets/fonts'),
        '@hoc': path.resolve(__dirname, 'src/hocs'),
        '@img': path.resolve(__dirname, 'src/assets/img'),
        '@page': path.resolve(__dirname, 'src/pages'),
        '@util': path.resolve(__dirname, 'src/utils'),
      },
    },
  }
}
