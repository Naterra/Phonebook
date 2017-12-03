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
    path: path.resolve(__dirname, "public/build/"),
    publicPath: "/new_phonebook/build/",
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

  plugins: [
    // generate index.html automatically for this project
    new HtmlWebpackPlugin({
      template: "src/index.html",
      filename: path.resolve(__dirname, "public/index.html")
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        BASENAME: JSON.stringify("/new_phonebook/"),
        API_URL: JSON.stringify("http://dibmanagement.com/new_phonebook/"),
        CLIENT: JSON.stringify(true),
        NODE_ENV: JSON.stringify("production")
      }
    })
  ]
};
