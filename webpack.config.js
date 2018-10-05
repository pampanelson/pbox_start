const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const path = require('path');

module.exports = {
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                    options: { minimize: true }
                }]
            }

        ]
    },

    devtool: 'inline-source-map',

    // not use yet 
    // multi entry for webpack
    // entry: {
    //     dev_page:['./src/index.html','./src/index.js']
    // },

    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],


    devServer: {
        contentBase: require('path').join(__dirname, "dist"),
        compress: true,
        port: 8033,
        host: "127.0.0.1",
        hot: true
    }
};