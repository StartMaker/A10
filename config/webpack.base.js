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
            '&static': path.resolve(__dirname, '../client/src/static'),
            '&components': path.resolve(__dirname, '../client/src/components'),
            '&store': path.resolve(__dirname, '../client/store')
        }
    },
    plugins: [
        new HappyPack({
            id: 'babel',
            threadPool: HappyPackPool,
            // cache: true,
            loaders: ['babel-loader','astroturf/loader']
        }),
        new ForkTsCheckerWebpackPlugin()
    ]
};