const path = require("path");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        "index": './src/index.js'
    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        //publicPath: 'dist/'
    },
    mode: 'development',
    optimization: {
        splitChunks: {
            chunks: "all",
            automaticNameDelimiter: "-",
            minSize: 10000,
        }
    },
    stats: 'none',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        index: "index.html",
        port: 9000
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.es6|\.jsx?$/,
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env', '@babel/preset-react'],
                        plugins: ['transform-class-properties']
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [miniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [miniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.jpe?g|\.png$/,
                use: ['file-loader']
            },
        ]

    },
    plugins: [
        new miniCssExtractPlugin({
            filename: "[name].style.css"
        }),
        new htmlWebpackPlugin({
            template: "src/local.hbs",
            filename: "index.html",
            chunks: ["vendors-index", "index"],
        })
    ]
};
