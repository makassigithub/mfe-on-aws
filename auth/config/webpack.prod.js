const { merge } = require('webpack-merge');
const packageJson = require('../package.json');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');

const productionConfig = {
    mode:'production',
    output:{
        filename:'[name].[contenthash].js',
        publicPath:'/auth/latest/'
    },
    plugins:[
        new ModuleFederationPlugin({
            name:'auth',
            filename:'remoteEntry.js',
            exposes:{
                './AuthApp':'./src/bootstrap.js'
            },
            shared:packageJson.dependencies
        })
    ]
}

module.exports = merge(commonConfig,productionConfig);