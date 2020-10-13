import createApp from "./app"

// 运行在服务端, 每次客户端请求, 都需要创建一个新的实例  原因和vue选项(option)中的data为函数一样, 否则会相互有影响

export default context => {
  // context.url 包含着当前访问服务器端的路径
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()
    router.push(context.url) // 默认跳转到对应路径   异步组件需要promise
    // 监听路由跳转完成  异步钩子  路由初始化相关异步组件加载完成
    router.onReady(() => {
      // 获取匹配到的组件
      const matchComponents = router.getMatchedComponents()
      if (matchComponents.length) {
        // 匹配到路由了
        Promise.all(
          matchComponents.map(component => {
            if (component.asyncData) {
              return component.asyncData(store)
            }
          })
        ).then(() => {
          // 服务端执行完毕后 渲染的是正常的   但是前段的store是旧的数据
          // 需要将后端的数据同步到vux中

          // 会自动注入到window上  vue-server-renderer注入的
          context.state = store.state // 将store放到上下文中

          resolve(app) // 路由跳转完成
        })
      } else {
        // 未匹配到路由
        reject({ code: 404 })
      }
    }, reject)
  })
}
