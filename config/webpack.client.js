/*
 * @Author: Jonath
 * @Date: 2020-10-11 13:47:22
 * @LastEditors: Jonath
 * @LastEditTime: 2020-10-13 23:53:36
 * @Description: 客户端webpack配置
 */
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin")
const { merge } = require("webpack-merge")
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const base = require("./webpack.base")
const resolve = dir => {
  return path.resolve(__dirname, dir)
}
module.exports = merge(base, {
  devServer: {
    // 开启本地服务端口号
    port: 9000
  },
  entry: {
    // 打包入口
    // [文件名]: [入口路径]
    client: resolve("../src/client-entry.js")
  },
  plugins: [
    //  生成客户端描述文件
    new VueSSRClientPlugin()
    // 可要可不要   非必须
    // 前端打包出的结果 只是用于挂载到服务端生成的字符串中
    // new HtmlWebpackPlugin({
    //   template: resolve("../template/index.client.html")
    // })
  ]
})
