const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const nodeModulesPath = path.resolve(__dirname, "node_modules");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    target: "web",

    entry: {
        home: ["./src/index.js"]
    },

    output: {
        path: path.join(__dirname, "dist"),
        filename: "[hash].js",
        chunkFilename: "[id].bundle.js",
        // temporary fix for import webworker ----- TODO ----------
        globalObject: "(typeof self !== 'undefined' ? self : this)",
        //globalObject: 'this', 
    },

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
            },
            // glsl loader
            {
                test: /\.glsl$/,
                use: [{
                    loader: "webpack-glsl-loader"
                }]
            },
            // webworker loader
            {
                test: /\.worker\.js$/,
                use: { loader: "worker-loader" }
            },

        ]
    },

    devtool: "inline-source-map",
    // devtool: "cheap-source-map",


    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],


    devServer: {
        contentBase: require("path").join(__dirname, "dist"),
        compress: true,
        port: 8033,
        host: "127.0.0.1",
        hot: true
    }
};