/*
 * @Author: Jonath
 * @Date: 2020-10-11 13:49:40
 * @LastEditors: Jonath
 * @LastEditTime: 2020-10-11 15:11:24
 * @Description: webpack配置
 */
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { VueLoaderPlugin } = require("vue-loader")

const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
  entry: resolve("./src/client-entry.js"),
  devServer: {
    contentBase: resolve("dist"),
    compress: true,
    port: 9000
  },
  output: {
    filename: "[name].bundle.[hash].js",
    path: resolve("dist")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /.vue$/,
        use: "vue-loader"
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ]
}
