<template>
  <div class="app" :style="{background:bgColor}">
    <Header></Header>
    <Home/>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './common/Header'
import Footer from './common/Footer'
import Home from './common/Body'
export default {
  name: 'App',
  data () {
    return {
      bgColor: '#fff'
    }
  },
  components: {
    Header,
    Footer,
    Home
  },

  computed: {
    picUrl () {
      return this.$store.state.picUrl
    }
  },

  watch: {
  },

  mounted () {
    // console.log(this.$utils)
    const that = this
    const defaultList = this.$utils.getItem('defaultList')
    that.$store.commit('addDefaultList', defaultList)
    // 切换背景为歌手照片（歌手照片好像请求不到）
    that.$bus.$on('setBg', function (e) {
      if (e) {
        // 判断是否存在歌手写真路劲
        if (that.picUrl) {
          // 存在设置为写真背景
          that.bgColor = `url(${that.picUrl}) center center`
        } else {
          // 不存在设置蓝色为全局背景
          that.bgColor = '#D79F00'
          // that.bgColor = `url(${that.picUrl}) center center`
        }
      } else {
        that.bgColor = '#fff'
      }
    })
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/styles/common/functions";
  .app {
    margin: 0 auto;
    width: 1004px;
    height: 670px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 1px #000 inset;
    &.bg{
      background: url("../assets/img/bg.jpg") center center no-repeat;
      background-size: 100% 100%;
    }
  }
  .route-container {
    flex: 1;
    border-right: 1px solid #eee;
    border-left: 1px solid #eee;
  }
</style>
