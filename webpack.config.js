const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
      background: './src/background.js',
      popup: './src/popup.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'static/js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpeg|jpg)$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'public/popup.html',
            inject: 'body',
            filename: 'popup.html',
            chunks: ['popup'],
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),
        new CopyWebpackPlugin([
            { from: 'public/manifest.json'}
        ])
    ]
};