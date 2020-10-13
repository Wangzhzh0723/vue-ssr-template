/*
 * @Author: Jonath
 * @Date: 2020-10-13 21:57:25
 * @LastEditors: Jonath
 * @LastEditTime: 2020-10-14 00:14:39
 * @Description: 用来创建vuex
 */

import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

// 每次调用都生成新的store实例
export default () => {
  const store = new Vuex.Store({
    state: {
      name: "小王"
    },
    mutations: {
      changeName(state, payload) {
        state.name = payload
      }
    },
    actions: {
      changeName({ commit }, payload) {
        return new Promise(resolve => {
          setTimeout(() => {
            commit("changeName", payload)
            resolve()
          }, 1000)
        })
      }
    },
    getters: {
      name: state => state.name
    }
  })
  // 前段运行时会执行此方法  用服务端的状态替换掉前端的状态
  if (typeof window !== "undefined" && window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
  }
  return store
}
