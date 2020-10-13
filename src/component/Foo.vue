<template>
  <div @click="onClickHandler">
    Foo1
  </div>
</template>

<script>
export default {
  name: "Foo",
  data() {
    return {}
  },
  methods: {
    onClickHandler() {
      alert(1)
    }
  }
}
</script>
<style lang="scss" scoped></style>
