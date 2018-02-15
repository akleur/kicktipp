var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        path.join(__dirname, '/socket_server.js')
    ],
    output: {
        path: path.join(__dirname, '/'),
        filename: 'socket_server.bundle.js'
    },
    target: 'node',
    node: {
        __filename: true,
        __dirname: true
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['babel-preset-es2015']
                }
            }
        ]
    }
};
