const HtmlWebpackPlugin = require('html-webpack-plugin')
const HTMLWpPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index__[contenthash].js',
    },
    plugins: [
        new HtmlWebpackPlugin(),
    ]
}