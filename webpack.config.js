// import { webpack } from "webpack";

const path = require('path');

module.exports = {
    mode: 'development', // мод разработка или продакшн
    entry: {
        main: './src/index.js',
        analytics: './src/analytics.js'
    }, // входноной (начальный) файл
    output: { // куда складывать и это обьект
        filename: '[name].[contenthash].js', // Имя по умолчанию пишут bundle. Можно добавить паттерн имени [name], [contanthash]
        path: path.resolve(__dirname, 'dist')
    }
};