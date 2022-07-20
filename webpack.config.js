const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'), // Webpack будет отталкиватся от этой папки. В entry можно прописывать путь без указания этой папки
    mode: 'development', // мод разработка или продакшн
    entry: {
        main: './index.js',
        analytics: './analytics.js'
    }, // входноной (начальный) файл
    output: { // куда складывать и это обьект
        filename: '[name].[contenthash].js', // Имя по умолчанию пишут bundle. Можно добавить паттерн имени [name], [contanthash]
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.json', '.png'],
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src'),
        }
    },
    optimization: {
        // splitChunks: {
        //     chunks: 'all'
        // }

        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all'
        },
    },
    plugins: [ // имеют сущность классов
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: 'body'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/folder.ico'),
                    to: path.resolve(__dirname, 'dist'),
                }
            ]
        }),
    ],
    devServer: {
        port: 4200,
    },
    target: 'web',
    module: {
        rules: [
            {
                test: /\.css$/, // если webpack встречает такие файлы то далее идут типы лоадеров
                use: ['style-loader', 'css-loader'] // выполняется справа на лево
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                type: 'asset/resource'
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            },
        ]
    }
};