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
  /*display: flex;*/
  /*flex-direction: column;*/
  /*justify-content: space-around;*/
}
.route-container {
  height: px2vw(550);
  /*background: #2c3e50;*/
}
</style>
