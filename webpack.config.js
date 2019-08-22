const webpack = require('webpack');
const path = require('path');
var config = {
    entry: './src/index.js',

    output: {
        path: path.join(__dirname, '/dist'),//path.join(__dirname, '/dist'),'/var/www/schoolsite/dist'
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
                use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
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