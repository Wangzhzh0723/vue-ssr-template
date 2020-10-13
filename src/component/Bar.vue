<template>
  <div @click="changeName">
    {{ $store.state.name }}
  </div>
</template>

<script>
export default {
  name: "Bar",
  data() {
    return {}
  },
  // 希望有些数据更新操作在后端执行
  asyncData(store) {
    // 只有页面级组件才有  因为是在路由组件调用的
    // 服务端执行完毕后 渲染的是正常的   但是前段的store是旧的数据
    // 需要将后端的数据同步到vux中
    return store.dispatch("changeName", "一一")
  },
  methods: {
    changeName() {
      this.$store.dispatch("changeName", "一一")
    }
  }
}
</script>
<style scoped>
div {
  color: red;
}
</style>
