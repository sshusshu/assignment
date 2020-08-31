const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode:'development',

    entry:{
        index: ['./src/assets/js/index.js'],
        about: ['./src/assets/js/about.js'],
        gallery: ['./src/assets/js/gallery.js']
    },
    output:{
        filename:'assets/js/[name].bundle.js',
        path:path.resolve(__dirname, 'dist/')
    },
    module: {
        rules:[
            {
                test:/\.js$/,
                exclude: /node_modules/,
                use: {
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                }
            }
            ,{
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
                        loader: "css-loader?-url",
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
        port: 9000
    },
    plugins:[
        new HtmlWebPackPlugin({
            title : 'index',
            hash: true,
            template: './src/index.ejs',
            chunks: ['index'],
            filename:'index.html'
        }),
        new HtmlWebPackPlugin({
            title : 'gallery',
            hash: true,
            template: './src/gallery.ejs',
            chunks: ['gallery'],
            filename:'gallery.html'
        }),
        new HtmlWebPackPlugin({
            title : 'about',
            hash: true,
            template: './src/about.ejs',
            chunks: ['about'],
            filename:'about.html'
        })
    ]
};
