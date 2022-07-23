const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
    const config = {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all'
        },
    };

    if (isProd) {
        config.minimizer = [
            new CssMinimizerWebpackPlugin(),
            new TerserWebpackPlugin(),
        ];
    }

    return config;
};

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const cssLoaders = param => {
    const loader = [{
        loader: MiniCssExtractPlugin.loader,
        options: {},
    }, 'css-loader'];

    if (param) {
        loader.push(param);
    }

    return loader;
};

module.exports = {
    context: path.resolve(__dirname, 'src'), // Webpack будет отталкиватся от этой папки. В entry можно прописывать путь без указания этой папки
    mode: 'development', // мод разработка или продакшн
    entry: {
        main: ['@babel/polyfill', './index.js'],
        analytics: './analytics.js'
    }, // входноной (начальный) файл
    output: { // куда складывать и это обьект
        filename: filename('js'), // Имя по умолчанию пишут bundle. Можно добавить паттерн имени [name], [contanthash]
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    resolve: {
        extensions: ['.js', '.json', '.png'],
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src'),
        }
    },
    optimization: optimization(),
    plugins: [ // имеют сущность классов
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: 'body'
        }),
        // new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/folder.ico'),
                    to: path.resolve(__dirname, 'dist'),
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        }),
    ],
    devServer: {
        port: 4200,
        hot: isDev,
    },
    target: 'web',
    devtool: isDev ? 'source-map' : '',
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.css$/, // если webpack встречает такие файлы то далее идут типы лоадеров
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {},
                }, 'css-loader'] // выполняется справа на лево. Вместо 'style-loader' используем MiniCssExtractPlugin.loader
            },
            {
                test: /\.less$/,
                use: cssLoaders('less-loader'),
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader'),
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
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
        ]
    }
};