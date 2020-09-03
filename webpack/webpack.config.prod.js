const config = require("./webpack.config.js");

const { merge } = require("webpack-merge");
const webpack = require("webpack");

const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(config, {
  mode: "production",
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
    }),
    new webpack.EnvironmentPlugin({
      LOGGING_LEVEL: JSON.stringify("INFO"),
      DEBUG: 0
    }),
    new CleanWebpackPlugin({
      root: config.output.path,
      verbose: true,
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
  optimization: {
    minimize: true,
  },
});