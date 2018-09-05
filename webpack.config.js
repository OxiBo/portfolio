const path = require('path');
// const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


let config = {
    entry: [
        'babel-polyfill',
        './src/index.js'
    ],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js',
        publicPath: 'dist/'
    },
    devServer: {
        overlay: true
    },
    module: {
        rules: [{
                test: /\.js$/,
                loader: "babel-loader",
                exclude: "/node_modules/"
            },

            {
                /* support for css file
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                     // use: "css-loader"
                    use: "css-loader!postcss-loader"
                })
                */
                /* use: [
                     'style-loader',
                     'css-loader'
                 ]*/

                test: /\.(scss)|(css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    // use: "css-loader"
                    use: ['css-loader', 'sass-loader']
                    // use: "css-loader!sass-loader!postcss-loader"
                    // use: "css-loader?sourceMap!sass-loader?sourceMap!postcss-loader"???
                })

            },

            // {
            //     test: /\.(css|scss|sass)$/,
            //     loader: 'style-loader!css-loader!sass-loader'
            //     // path: path.resolve(__dirname, 'src/css')
            // }


            // {
            //     // test: /\.(png|jpg|jpeg|gif)$/i,
            //     test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
            //     // loader:'url-loader?limit=100000'
            //     use: [{
            //         loader: 'file-loader',
            //     //     loader: 'url-loader'
            //         options: {
            //             name: './css/gallery/[name].[ext]'
            //             // limit: 8192
            //         }

            //     }]
            // }
        ]
    },
    plugins: [
        new ExtractTextPlugin("main.css"),
        // new ExtractTextPlugin("./scss/main.scss"),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html'
        })
    ],
    performance: {
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
    }
    // postcss: function () {
    //     return [autoprefixer];
    // }
    // devtool: 'eval-sourcemap'
}


module.exports = (env, options) => {

    // depending on the mode (production or development build config object and set devtool to see which part(file) has an error more accurately)
    let production = options.mode === "production";

    config.devtool = production ? false : "eval-sourcemap"; // it is possible instead of false write 'source-map' but it this case the code will be accessible in console.
    // console.log(options)
    return config;
};


// module.exports = config;
