const webpack = require("webpack");

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    // entry: "./src/app.js",
    entry: {
      app: ["./src/app.js", "./src/style.scss"],
      // account: ["./account.js", "./account.scss"],
    },
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
      ],
    },
    optimization: {
      minimize: isProduction,
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: "styles.css" }),
      new HtmlWebpackPlugin({ template: "./src/index.html" }),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      }),
    ].filter(Boolean),
    // devServer: {
    //     static: "./dist",
    //     open: true,
    //     hot: true,
    //   },
    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
      },
      port: 3000, // The port to run the server on
      open: true, // Automatically open the browser
      hot: true, // Enable Hot Module Replacement
      compress: true, // Enable Gzip compression
      historyApiFallback: true, // For SPA routing, serving index.html on 404
    },

    watch: !isProduction,
  };
};
