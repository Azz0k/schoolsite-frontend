const webpack = require('webpack');
const path = require('path');
var config = {
    entry: './src/index.js',

    output: {
        path: '/var/www/schoolsite/dist',//path.join(__dirname, '/dist'),
        filename: 'index.js',
    },

    devServer: {
        inline: true,
        port: 8080
    },
    resolveLoader: {
        modules: [path.join(__dirname, 'node_modules')]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',

                query: {
                    presets: ['es2015', 'react']
                }
            },
            { test: /\.css$/, loader: 'css-loader' },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            }
        ]
    },
}

module.exports = config;