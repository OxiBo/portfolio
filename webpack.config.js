const path = require("path");
// const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

let config = {
  entry: ["babel-polyfill", "./src/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    // path: '/',
    filename: "index.js",
    // publicPath: "/portfolio/"
    // publicPath: "/",
  },
  devServer: {
    // host: '0.0.0.0',
    port: 6060,
    publicPath: "/",
    // public: 'http://localhost:8080'
    // stats: 'errors-only',
    historyApiFallback: true,
    contentBase: path.join(__dirname, "dist"), //'./dist',
    // hot: true,
    inline: true,
    compress: true,
    overlay: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader']
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader?url=false", "postcss-loader"],
        }),
      },
      {
        test: /\.scss$/,
        // use: ['style-loader', 'css-loader', 'sass-loader']
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader?url=false", "postcss-loader", "sass-loader"], // use ?url=false to be able to load the background images(the explanation is from local-weather-api)
        }),
      },
      {
        test: /\.(jpe?g|gif|png|svg|pdf)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin("[name].css"),
    // new ExtractTextPlugin("./scss/main.scss"),
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
    }),
    new CopyWebpackPlugin([
      { from: "./src/styles/gallery", to: "./gallery" },
      { from: "./src/pdf-docs", to: "./pdf-docs" },
    ]), // copies folder gallery with images to dist
  ],
  performance: {
    hints: process.env.NODE_ENV === "production" ? "warning" : false,
  },
  // postcss: function () {
  //     return [autoprefixer];
  // }
  // devtool: 'eval-sourcemap'
};

module.exports = (env, options) => {
  // depending on the mode (production or development build config object and set devtool to see which part(file) has an error more accurately)
  let production = options.mode === "production";

  config.devtool = production ? false : "eval-sourcemap"; // it is possible instead of false write 'source-map' but it this case the code will be accessible in console.
  // console.log(options)
  return config;
};

// module.exports = config;
