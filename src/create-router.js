/*
 * @Author: Jonath
 * @Date: 2020-10-13 21:57:25
 * @LastEditors: Jonath
 * @LastEditTime: 2020-10-13 22:14:09
 * @Description: 用来创建路由
 */

// 可以用异步组件加载 (使用的是webpack中代码分割功能import())

import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const Foo = () => import(/* webpackChunkName: "Foo" */ "./component/Foo")
const Bar = () => import(/* webpackChunkName: "Bar" */ "./component/Bar")

// 每次调用都生成新的路由实例
export default () => {
  return new VueRouter({
    mode: "history",
    routes: [
      {
        path: "/foo",
        component: Foo
      },
      {
        path: "/bar",
        component: Bar
      }
    ]
  })
}
