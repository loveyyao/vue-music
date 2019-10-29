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
    this.$axios.get('/search', {
      keywords: '海宽天空'
    }).then((res) => {
      console.log(res)
    })
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
  /*border: 1px solid #eee;*/
  border-top-color:#0096E6;
  border-bottom-color:#0096E6;
  /*box-shadow: 0 0 1px #eee inset;*/
}
.route-container {
  height: px2vw(550);
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
