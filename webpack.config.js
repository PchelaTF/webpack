const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
    plugins: [ // имеют сущность классов
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: 'body'
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/, // если webpack встречает такие файлы то далее идут типы лоадеров
                use: ['style-loader', 'css-loader'] // выполняется справа на лево
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                type: 'asset/resource'
            }
        ]
    }
};