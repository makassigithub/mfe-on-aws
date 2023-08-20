const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const commonConfig = require('./webpack.common');

const devConfig = {
    mode: 'development',
    output:{
        publicPath:'http://localhost:8082/',
    },
    devServer:{
        port: 8082,
        //historyApiFallback: true,
        historyApiFallback:{
            // TO investigate: deeper paths like /auth/signin won't work unless the
            // '/' before the index.html or historyApiFallback: true,
            index:'index.html'
        }
    },
    plugins:[
        new ModuleFederationPlugin({
            name: 'auth',
            filename: 'remoteEntry.js',
            exposes:{
                './AuthApp': './src/bootstrap'
            },
            shared:packageJson.dependencies
        }),
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        })
    ]
}

module.exports = merge(commonConfig, devConfig);