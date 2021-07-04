const HtmlWebpackPlugin = require('html-webpack-plugin')
const HTMLWpPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = (env, arg) => {
    const devMode = arg.mode !== "production";

    return {
        devtool: devMode ? 'eval' : 'source-map',
        entry: path.resolve(__dirname, './src/index.js'),
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
                    use: ['css-loader', 'postcss-loader'],
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
                }
            ]
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'index__[contenthash].js',
        },
        plugins: [
            new MiniCssExtractPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, './public/index.html'),
                filename: './index.html',
            }),
        ],
        resolve: {
            alias: {
                '@comp': path.resolve(__dirname, 'src/components')
            }
        },
    }
}