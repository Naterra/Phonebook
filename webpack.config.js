const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
    'redux', 'react-redux'
];

module.exports = {
    entry: {
        bundle: './src/index.js',
        vendor: VENDOR_LIBS
    },


    output: {
        path: path.resolve(__dirname, ''),
        publicPath: '/',
        filename: '[name].js'
    },
    module: {
        rules:[
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
                loader: 'url-loader?limit=10000',
            },
            {
                test: /\.(eot|ttf|wav|mp3)$/,
                loader: 'file-loader',
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        host: 'localhost',
        port: 3000

    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),

        //Do not generate chunks for this project
        // new webpack.optimize.CommonsChunkPlugin({
        //     names: ['vendor','manifest'],
        //     //minChunks: Infinity,
        //     //filename: 'vendor.js',
        // }),

        // generate index.html automatically for this project
        new HtmlWebpackPlugin({
            template:'src/index.html'
        })

        // new webpack.DefinePlugin({
        //     'process.env': {
        //         CLIENT: JSON.stringify(true),
        //         'NODE_ENV': JSON.stringify('development'),
        //     }
        // }),
    ]

};
