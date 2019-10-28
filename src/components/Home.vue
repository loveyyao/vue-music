<template>
  <div class="main wh">
    <div class="main-left h">{{msg}}</div>
    <div class="main-right h">{{msg}}</div>
  </div>
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
  .main{
    display: flex;
    .main-left{
      width: 30%;
    }
    .main-right{
      width: 70%;
    }
  }
</style>
