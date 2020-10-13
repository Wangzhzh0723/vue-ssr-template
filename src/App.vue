<template>
  <div id="app">
    <router-link to="/foo">foo</router-link>
    <router-link to="/bar">bar</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {}
  },
  methods: {}
}
</script>
