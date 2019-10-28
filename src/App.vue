<template>
  <div id="app">
    <Header></Header>
    <div class="route-container w">
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/common/Header'
import Footer from './components/common/Footer'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  components: {
    Header,
    Footer
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
  @import "./assets/styles/common/functions";
#app {
  width: 100%;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow: hidden;
  border: 1px solid #eee;
  border-top-color:#0096E6;
  border-bottom-color:#0096E6;
  box-shadow: 0 0 1px #eee;
}
.route-container {
  height: px2vw(550);
}
</style>
