<template>
  <div id="app">
    App
    <Foo />
    <Bar />
  </div>
</template>

<script>
import Foo from "./component/Foo.vue"
import Bar from "./component/Bar.vue"
export default {
  name: "App",
  components: {
    Foo,
    Bar
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
<style lang="scss" scoped></style>
