const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');

const config = {
    devServer: {
        publicPath: '/',
        contentBase: './src/popup',
        hot: true,
        open: true
    },
    mode: process.env.NODE_ENV,
    context: __dirname + '/src',
    entry: {
        'background': './background.js',
        'popup': './popup/popup.js',
    },
    output: {
        path: __dirname + '/build',
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.vue'],
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loaders: 'vue-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ],
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.sass$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader?indentedSyntax'],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
                loader: 'url-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: '/images/',
                    emitFile: false,
                },
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: '/fonts/'
                },
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            global: 'window',
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new CopyWebpackPlugin([
            {from: 'icons', to: 'icons'},
            {
                from: 'popup/index.html',
                to: 'index.html'
            },
            {from: 'manifest.json', to: 'manifest.json'},
        ]),
    ],
};

if (config.mode === 'production') {
    config.plugins = (config.plugins || []).concat([
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
            },
        })
    ]);
}

module.exports = config;
