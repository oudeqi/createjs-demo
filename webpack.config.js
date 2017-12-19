const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
module.exports = {
    devtool: '#source-map',
    entry: {
        'EaselJS-baseUse': './app/EaselJS-baseUse/index.js',
        'EaselJS-Bitmap': './app/EaselJS-Bitmap/index.js',
        'mouse-control': './app/mouse-control/index.js',
        'PreloadJS': './app/PreloadJS/index.js',
        'TweenJS': './app/TweenJS/index.js',
        'move-and-jump': './app/move-and-jump/index.js',
        'move-and-jump': './app/move-and-jump/index.js',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name].js',
        publicPath: './',
        pathinfo: true
    },
    resolve: {
	    alias: {
	    	createjs: 'createjs/builds/1.0.0/createjs.js'
	    }
	},
    module: {
        rules: [{
                test: /(\.jsx|\.js)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                // test: /vendor/,
                test: require.resolve('createjs/builds/1.0.0/createjs.js'),
                loader: "imports-loader?this=>window"
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    publicPath: '../',
                    use: [{
                        loader: "css-loader",
                        options: {
                            modules: false
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            config: {
                                path: 'postcss.config.js',
                                ctx: {
                                    autoprefixer: {browsers: ['> 1%']}
                                }
                            }
                        }
                    }]
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: 'img/[name].[ext]',
                        limit: 1
                    }
                }]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]',
                    publicPath: '../',
                    limit: 1,
                }
            }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].css',
            allChunks: false
        }),
        new HtmlWebpackPlugin({
            filename: 'EaselJS-baseUse.html',
            template: './app/EaselJS-baseUse/index.html',
            chunks: ['EaselJS-baseUse']
        }),
        new HtmlWebpackPlugin({
            filename: 'EaselJS-Bitmap.html',
            template: './app/EaselJS-Bitmap/index.html',
            chunks: ['EaselJS-Bitmap']
        }),
        new HtmlWebpackPlugin({
            filename: 'mouse-control.html',
            template: './app/mouse-control/index.html',
            chunks: ['mouse-control']
        }),
        new HtmlWebpackPlugin({
            filename: 'PreloadJS.html',
            template: './app/PreloadJS/index.html',
            chunks: ['PreloadJS']
        }),
        new HtmlWebpackPlugin({
            filename: 'TweenJS.html',
            template: './app/TweenJS/index.html',
            chunks: ['TweenJS']
        }),
        new HtmlWebpackPlugin({
            filename: 'SoundJS.html',
            template: './app/SoundJS/index.html',
            chunks: ['SoundJS']
        }),
        new HtmlWebpackPlugin({
            filename: 'move-and-jump.html',
            template: './app/move-and-jump/index.html',
            chunks: ['move-and-jump']
        }),
        // new webpack.DllReferencePlugin({
        //     manifest: require('./dll_modules/dll-manifest.json')
        // }),
        // new AddAssetHtmlPlugin([{
        //     filepath: path.join(__dirname, 'dll_modules', 'dll.js'),
        //     hash: true,
        //     outputPath: 'vendor',
        //     publicPath: './vendor/',
        //     includeSourcemap: false
        //     // 默认为true。 当设置为true时，add-asset-html-plugin 会查找js的sourceMap文件
        // }])
    ],
    devServer: {
        // host: "192.168.0.12",
        host: "localhost",
        contentBase: [path.join(__dirname, 'app')],
        headers: {
            "X-Custom-Foo": "bar"
        },
        historyApiFallback: true,
        compress: true,//对资源启用 gzip 压缩
        publicPath: '/',
        inline: true,
        port: 3000,
        clientLogLevel: "none",//none, error, warning 或者 info（默认值）
        noInfo: false,
        open: true,
        // openPage: '/different/page'
    },
}


