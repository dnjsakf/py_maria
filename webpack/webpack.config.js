const webpack = require("webpack");
const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: {
    app: [
      "@babel/polyfill",
      path.join(__dirname, "../src/index.js"),
      path.join(__dirname, "../src/index.css"),
    ],
    vendor: [
      "react", "react-dom", "react-router-dom"
    ],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.join(__dirname, "../dist"),
    publicPath: "/public/",
    chunkFilename: "[name].chunk.js",
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify("v1.0.0"),
      INIT_DATA: JSON.stringify({
        num: 10,
        test: 100,
      }),
      BROWSER_SUPPORTS_HTML5: true,
      ONE: 1,
      TWO: 1+1,
      THREE: "1+2",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].bundle.css",
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../src/index.html"),
    }),
    new webpack.ProgressPlugin((percentage, message, ...args)=>{
      console.info(Math.trunc(percentage*100), "%", message, ...args);
    }),
  ],
  // Loaders
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ MiniCssExtractPlugin.loader, "css-loader" ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: "~",
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      new TerserJSPlugin({
        cache: true,
        parallel: true,
      }), 
      new OptimizeCSSAssetsPlugin({})
    ],
  },
}