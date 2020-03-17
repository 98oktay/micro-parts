const path = require("path");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const CssoWebpackPlugin = require('csso-webpack-plugin').default;

module.exports = {
    entry: {
        "index": './src/js/index.js'
    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        //publicPath: 'dist/'
    },
    mode: 'production',
    optimization: {
        splitChunks: {
            chunks: "all",
            automaticNameDelimiter: "-",
            minSize: 10000,
        }
    },
    stats: 'none',
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
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                "**/*",
                path.join(process.cwd(), "dist/**/*")
            ]
        }),
        new htmlWebpackPlugin({
            template: "src/local.hbs",
            filename: "index.html",
            chunks: ["vendors-index", "index"],
        })
    ]
};
