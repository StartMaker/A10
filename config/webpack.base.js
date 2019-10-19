//客户端打包 base
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HappyPack = require('happypack');
const HappyPackPool = HappyPack.ThreadPool({size: 5});

module.exports = {
    module: {
        rules: [
            {
                test:/\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'HappyPack/loader?id=babel'
            },
            {
                test: /\.(ts|tsx)?$/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [".js", ".json", ".jsx",".ts",".tsx"],
        alias: {
            '&static': path.resolve(__dirname, '../src/static'),
            '&icons': path.resolve(__dirname, '../src/static/icons'),
            '&helpers': path.resolve(__dirname, '../src/helpers'),
            '&images': path.resolve(__dirname, '../src/static/images'),
            '&components': path.resolve(__dirname, '../src/components'),
            '&store': path.resolve(__dirname, '../src/store')
        }
    },
    plugins: [
        new HappyPack({
            id: 'babel',
            threadPool: HappyPackPool,
            // cache: true,
            // threads: 5,
            loaders: ['babel-loader','astroturf/loader']
        }),
        new ForkTsCheckerWebpackPlugin()
    ]
};