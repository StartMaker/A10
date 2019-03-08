const path = require('path');
//处理模板html自动引入JS
const HtmlWebpackPlugin = require('html-webpack-plugin');
//清除文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin');
//js压缩插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    mode: "development",
    entry: {
        app: path.join(__dirname, "src/index.js")
    },
    output: {
        filename: '[name].js',//名字已入口entry 名字命名
        path: path.join(__dirname, 'dist'),//输出文件的路径
        publicPath: '/',
        chunkFilename: "[name].js",
        libraryTarget: 'var',
        library: 'XLSX'
    },
    node: {
        process: false,
        Buffer: false
    },
    module: {
        rules: [
            {
                test:/\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader",
                    'astroturf/loader',
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|woff|woff2|svg|ttf|eot)($|\?)/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 6000
                        }
                    },
                    {
                        loader:'@svgr/webpack',
                        options:{
                            babel: true,
                            icon: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    // {
                    //     loader: "postcss-loader",
                    //     options: {
                    //         plugins: [
                    //             require('postcss-sprites')(postcssSpritesOpts)
                    //         ]
                    //     }
                    // },
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.(ts|tsx)?$/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            },
            // {
            //     test: /\.(svg(\?v=\d+\.\d+\.\d+)?)|(png|woff|woff2|ttf|eot)$/,
            //     issuer: {
            //         test: /\.jsx?$/
            //     },
            //     use: ['babel-loader', '@svgr/webpack', 'url-loader']
            // },
            // {
            //     test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            //     loader: 'url-loader'
            // }
        ]
    },
    // 输出源码
    devtool: 'source-map',
    /**
     * 一些优化配置
     */
    // optimization: {
    //     // 压缩js
    //     minimizer: [
    //       new UglifyJsPlugin()
    //     ],
    //     // 抽离公用的js部分 , 配置自动提取node_modules里用到的模块如jquery
    //     splitChunks: {
    //         cacheGroups: {
    //             vendor: {
    //                 // test: /\.js$/,
    //                 test: /[\\/]node_modules[\\/]/,
    //                 chunks: "initial", //表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
    //                 name: "vendor", //拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；
    //                 enforce: true,
    //             },
    //
    //         }
    //     }
    // },
    resolve: {
        extensions: [".js", ".json", ".jsx",".ts",".tsx"],
        alias: { "./dist/cpexcel.js": "" }
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        //清除文件
        new CleanWebpackPlugin(['dist']),
        //设置默认环境变量
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
            LOCAL_ROOT: JSON.stringify("http://ziksang.com")
        }),
        /**
         * chunks 代码块,vendor 为固定静态资源splitChunks配置,各个模板的入口 对应entry入口模块
         */
        new HtmlWebpackPlugin({
            template: "./src/index-template.html",
            inject: true,
            favicon: './src/App/static/image/logo.jpg',
            filename: "index.html",
            hash: true
        }),
        new ExtractTextWebpackPlugin({ // 在plugins中配置属性
            filename: 'css/[name].css' // 配置提取出来的css名称
        }),
        //配合devServer 实现热更新
        new webpack.HotModuleReplacementPlugin()
    ]
};