<template>
  <div>{{msg}}</div>
</template>
<script>

export default {
  props: [],
  components: {
  },

  data () {
    return {
      msg: 'hello world'
    }
  },

  computed: {
  },

  methods: {
  },

  created () {
    console.log('')
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/styles/common/functions";
</style>
