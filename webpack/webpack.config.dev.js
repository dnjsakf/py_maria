const config = require("./webpack.config.js");

const { merge } = require("webpack-merge");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = merge(config, {
  mode: "development",
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false),
    }),
    new webpack.EnvironmentPlugin({
      LOGGING_LEVEL: JSON.stringify("DEBUG"),
      DEBUG: 1
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "public",
          // to: "public",
          globOptions: {
            ignore: [
              "**/.*",
              "**/private/**",
            ],
          }
        },
      ],
    }),
  ],
  module:{
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)?$/,
        include: /node_modules/,
        use: ['react-hot-loader/webpack'],
      },
    ]
  },
  optimization: {
    namedChunks: true,
  },
  devServer: {
    host: "localhost",
    port: 4000,
    hot: true,
    //open: true,
    contentBase: config.output.path,
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    proxy: {
      '/': {
        target: "http://localhost:3000/"
      },
      '/api': {
        target: "http://localhost:4001/api"
      }
    }
  },
});