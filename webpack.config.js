const path = require('path');                                                   // подключаем path к конфигу вебпак
const MiniCssExtractPlugin = require("mini-css-extract-plugin");    
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const webpack = require('webpack');                                             // плагин хэширования
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';                           // создаем переменную для development-сборки

module.exports = {                                                              // module.exports — это синтаксис экспорта в Node.js
    entry: { main: './src/index.js' },                                          // указали первое место куда заглянет webpack — файл index.js в папке src
    output: {                                                                   // указали в какой файл будет собирться весь js используя утилиту path и дали ему имя
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'                                       // указали путь к файлу, в квадратных скобках куда вставлять сгенерированный хеш
    },
    module: {
        rules: [                                                                // тут описываются правила
            {                                                   
                test: /\.js$/,                                                  // регулярное выражение, которое ищет все js файлы
                exclude: /node_modules/,                                        // исключает папку node_modules
                use: { loader: "babel-loader" },                                // весь JS обрабатывается пакетом babel-loader
            },
            {
                test: /\.css$/i,
                use: [
                    (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),     // добавили минификацию CSS
                    'css-loader', 
                    'postcss-loader'
                ] 
            },
            {
                test: /\.(png|jpg|gif|ico|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './images/[name].[ext]',      // указали папку, куда складывать изображения
                            esModule: false
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {}
                    },
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: './vendor/[name].[ext]',              // указали папку, куда складывать шрифты
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                    preset: ['default'],
            },
            canPrint: true
        }),
        new HtmlWebpackPlugin({
            // Означает, что:
            inject: false,                                          // стили НЕ нужно прописывать внутри тегов
            template: './src/index.html',                           // откуда брать образец для сравнения с текущим видом проекта
            filename: 'index.html'                                  // имя выходного файла, то есть того, что окажется в папке dist после сборки
        }),
        new WebpackMd5Hash(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
};
