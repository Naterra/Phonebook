const webpack = require("webpack");
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const VENDOR_LIBS = ["redux", "react-redux"];

module.exports = {
  entry: {
    bundle: "./src/index.js",
    vendor: VENDOR_LIBS
  },

  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: "url-loader?limit=10000"
      },
      {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: "file-loader"
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    host: "localhost",
    hot: true,
    port: 3000
  },
  plugins: [
    // generate index.html automatically for the project
    new HtmlWebpackPlugin({
      template: "src/index.html"
    }),

    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),

    new webpack.DefinePlugin({
      "process.env": {
        BASENAME: JSON.stringify("/"),
        CLIENT: JSON.stringify(true),
        NODE_ENV: JSON.stringify("development")
      }
    })
  ]
};
