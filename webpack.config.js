const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        index: './src/index/index.ts',
        receipt: './src/receipt/receipt.ts',
    },
    target: 'web',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: { emitErrors: true },
            },
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'src', 'index', 'index.html'),
            chunks: ['index'],
        }),
        new HtmlWebpackPlugin({
            filename: 'receipt.html',
            template: path.resolve(__dirname, 'src', 'receipt', 'receipt.html'),
            chunks: ['receipt'],
        }),
        new MiniCssExtractPlugin(),
    ],
};
