const path = require('path');
const folderPath = path.resolve(__dirname, "./src/");
const HtmlWebPackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode:'development',
    devtool: "source-map",
    entry:{
        css: ['./src/assets/scss/style.scss'],
        index: ['./src/assets/js/index.js'],
    },
    output:{
        filename:'assets/js/[name].bundle.js',
        path:path.resolve(__dirname, 'dist/'),
        sourceMapFilename: '[file].map'
    },
    module: {
        rules:[
            {
                test:/\.js$/,
                exclude: /node_modules/,
                use: {
                    loader:'babel-loader',
                    options:{
                        sourceMap: true,
                        presets:['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "assets/css/[name].css"
                        }
                    },
                    {
                        loader: "extract-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            url : false,
                            sourceMap: true,
                            importLoaders: 2
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: 'inline'
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap:true
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    output: {
                        comments: false,
                    },
                },
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorPluginOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }],
                }
            })
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: false,

        hot: true,
        open: true,
        port: 9600
    },
    plugins:[
        new HtmlWebPackPlugin({
            title : 'test',
            hash: true,
            template: './src/ejs/index.ejs',
            chunks: ['index'],
            filename:'index.html',
            HTML_PATH: folderPath
        }),
        new HtmlWebpackTagsPlugin({
            hash: true,
            append: true,
            tags: ['./assets/css/style.css']
        })
    ]
};
