/*
 * @Author: Jonath
 * @Date: 2020-10-11 13:47:13
 * @LastEditors: Jonath
 * @LastEditTime: 2020-10-13 00:24:48
 * @Description: 基础(共用)webpack配置
 */
const path = require("path")
const { VueLoaderPlugin } = require("vue-loader")
// const { CleanWebpackPlugin } = require("clean-webpack-plugin")
module.exports = {
  output: {
    // 出口
    filename: "[name].bundle.js", // 打包文件名
    path: path.resolve(__dirname, "../dist") // 输出路径
  },
  devtool: "source-map",
  resolve: {
    // 解析文件时  按照以下孙旭查找后缀
    extensions: [".js", ".vue", ".css", ".jsx"]
  },
  module: {
    // 针对不同模块做不同的处理
    rules: [
      { test: /\.vue/, use: "vue-loader" },
      // loader顺序是从上到下  从右到左
      // 默认会把.vue文件中的样式变成.css
      { test: /\.css/, use: ["vue-style-loader", "css-loader"] },
      {
        test: /\.js/,
        use: {
          // 默认使用babel-loader ==> babel-core (transform) => preset
          loader: "babel-loader",
          options: {
            // 将js文件 从 es6 => es5
            presets: ["@babel/preset-env"]
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [new VueLoaderPlugin()]
}
