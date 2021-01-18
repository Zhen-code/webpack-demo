const path = require('path');const HtmlWebpackPlugin = require('html-webpack-plugin');const MiniCssExtractPlugin = require('mini-css-extract-plugin');const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');const WorkboxPlugin = require('workbox-webpack-plugin')const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')const webpack = require('webpack');process.env.NODE_ENV = 'development';module.exports = {    mode: "production",    entry: ['./index.js','./index.html'],    output: {        filename: "./js/[name].[contenthash:10].js",        path: path.join(__dirname,'./dist'),    },    module: {        rules: [            {                oneOf: [                    {test: /\.less$/, use: ['style-loader','css-loader','less-loader']},                    {test: /\.css$/i,                        use: [MiniCssExtractPlugin.loader,"css-loader",                            {                                loader: 'postcss-loader',                                options: {                                    postcssOptions:{                                        plugins: [                                            [                                                "postcss-preset-env",                                                {                                                }                                            ]                                        ]                                    }                                }                            }                        ]                    },                    {test: /\.(jpg|png|gif|svg)$/,loader: 'url-loader',                        options: {limit: 8*1024, esModule: false, name: '[hash:10].[ext]',outputPath:'./image'}},                    {test: /\.html$/, loader: 'html-loader'},                    {exclude: /\.(html|js|css|jpg|png|gif)/, loader: 'file-loader', options: {                            name: '[hash:10].[ext]',                            outputPath: './font'                        }                    },                    {                        test: /\.js$/,                        exclude: /node_modules/,                        use:[                            {                                loader: "thread-loader",                                options: {                                    works:2                                }                            },                            {                                loader: "babel-loader",                                options: {                                    presets:[                                        [                                            '@babel/preset-env',                                            {                                                useBuiltIns: 'usage',                                                corejs:{                                                    version: 3                                                },                                                targets: {                                                    chrome: '70',                                                    firefox: '62',                                                    ie: '9',                                                    safari: '10',                                                    edge: '17',                                                }                                            }                                        ]                                    ],                                    cacheDirectory: true                                }                            },                            {                                loader: 'eslint-loader',                                options: {                                    fix: true                                }                            }                        ],                    }                ]            }        ]    },    plugins: [        new MiniCssExtractPlugin({           filename: './css/[name].[contenthash:10].css'        }),        new HtmlWebpackPlugin({            template: "./index.html",            filename: "./index.html",            showErrors: true,            inject: 'body',            minify: {                collapseWhitespace: true,                removeComments: true            }        }),        new OptimizeCssAssetWebpackPlugin(),        new WorkboxPlugin.GenerateSW({            clientsClaim: true,            skipWaiting: true        }),        new webpack.DllReferencePlugin({            manifest: path.resolve(__dirname,'dll/manifest.json')        }),        new AddAssetHtmlWebpackPlugin({            filepath: path.resolve(__dirname,'dll/jquery.js')        })    ],    optimization: {        minimize: false,        splitChunks: {            chunks: 'all'        }    },    devServer: {        contentBase: './dist',        host: 'localhost',        port: 8080,        compress: true,        open: true,        hot: true    },    devtool: 'eval-source-map'}