/*
 * @Author: Jonath
 * @Date: 2020-10-11 13:47:48
 * @LastEditors: Jonath
 * @LastEditTime: 2020-10-13 00:14:50
 * @Description: 服务端webpack配置
 */
const { merge } = require("webpack-merge")
const path = require("path")
const base = require("./webpack.base")

const HtmlWebpackPlugin = require("html-webpack-plugin")
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin")

const resolve = dir => {
  return path.resolve(__dirname, dir)
}
module.exports = merge(base, {
  entry: {
    // 打包入口
    // [文件名]: [入口路径]
    server: resolve("../src/server-entry.js")
  },
  target: "node", // 给node使用
  mode: "production",
  output: {
    libraryTarget: "commonjs2" // 导出供服务端渲染来使用
  },
  plugins: [
    //  生成服务端描述文件
    new VueSSRServerPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.ssr.html", // 输出文件名
      template: resolve("../template/index.ssr.html"), // 模板
      minify: false, // 不压缩
      excludeChunks: ["server"] // 排除引入文件
    })
  ]
})
