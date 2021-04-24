const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const config = {
    entry: ["./src/js/index.js", "./src/scss/main.scss"],
    output: {
        filename: "./js/bundle.js"
    },
    mode: 'none',
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()]
    },
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        include: path.resolve(__dirname, "src/scss"),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {}
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              url: false
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            },
          },
        ],
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./css/main.min.css"
    })
  ]
};

module.exports = config;
