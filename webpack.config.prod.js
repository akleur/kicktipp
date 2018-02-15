var path = require('path');
var webpack = require('webpack');

module.exports = {
    target: 'web',
    entry: [
        path.join(__dirname, '/app/src/index.js')
    ],
    output: {
        path: path.join(__dirname, '/app/dist/js'),
        filename: 'frontend.js'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                query: {
                    presets: ['babel-preset-es2015']
                }
            }
        ]
    },
    externals: {
        foundation: 'Foundation'
    },
    plugins: [
        new webpack.DefinePlugin({ // <-- key to reducing React's size
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};

