//客户端代码打包 development
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LessPluginFunctions = require('less-plugin-functions');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const  config = webpackMerge(baseConfig, {
    mode: 'development',
    output: {
        publicPath: "/",
        filename: '[name].js',
        path: path.join(__dirname, '../dist'),
        libraryTarget: 'var',
        library: '_dll_vendors'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        hot: true,
        host: '0.0.0.0',
        progress: true,
        inline: true,
        port: 3000,
        compress: true,
        historyApiFallback: true,
        proxy: {
            '/api/*': {
                target: 'http://localhost:8080'
            }
        }
    },
    entry: {
        main: [
          'react-hot-loader/patch',
          path.resolve(__dirname, "../src/index.js")
        ]
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader:"less-loader",
                        options: {
                            plugins: [
                                new LessPluginFunctions()
                            ],
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|woff|woff2|svg|eot|jpg)($|\?)/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            mimetype:'images/png',
                            name: 'images/[name].[hash:7].[ext]'
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            inject: true,
            filename: "index.html",
            hash: true
            // loading: loading
        }),
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('development')
            },
        }),
        new webpack.DllReferencePlugin({
            manifest: require(path.join(__dirname, './dll/vendors.manifest.json'))
        }),
        new AddAssetHtmlPlugin([
            {
                // 要添加到编译中的文件的绝对路径，以及生成的HTML文件。支持 globby 字符串
                filepath: require.resolve('./dll/vendors.dll'),
                // 文件输出目录
                outputPath: './dist',
                // 脚本或链接标记的公共路径
                publicPath: './dist'
            }
        ]),
        new CleanWebpackPlugin(['dist'],{
            root: path.resolve(__dirname, '..')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
});

module.exports = config;
