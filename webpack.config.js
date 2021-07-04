const HtmlWebpackPlugin = require('html-webpack-plugin')
const HTMLWpPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    module: {
        rules: [
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
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
            filename: './index.html',
        }),
    ]
}