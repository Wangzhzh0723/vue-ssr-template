import Vue from "vue"
import App from "./App.vue"
export default () => {
  // 为了保证实例的唯一性所以导出一个创建实例的函数
  const app = new Vue({
    render: h => h(App)
  })
  return app
}
