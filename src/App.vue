<template>
  <div id="app">
    <div class="route-container">
      <Home/>
    </div>
  </div>
</template>

<script>
import Home from './components/Home'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  components: {
    Home
  },

  computed: {
  },

  watch: {
  },

  mounted () {
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  overflow: hidden;
}
.route-container {
  width: 100%;
  height: 100%;
}
</style>
