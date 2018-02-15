var webpack = require('webpack');

module.exports = {
    entry: [
        './app/src/index.js'
    ],
    output: {
        path: './app/dist/js',
        filename: 'frontend.js'
    },
    devtool: '#sourcemap',
    module: {
        loaders: [
            {
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: { presets: ['es2015', 'react'] }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
