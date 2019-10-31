<template>
  <div id="app" :style="{background:bgColor}">
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
      bgColor: '#fff'
    }
  },
  components: {
    Header,
    Footer
  },

  computed: {
    // 从vuex中获取当前需要播放的音乐
    atPresentPlayMusic () {
      return this.$store.state.atPresent
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
        if (that.atPresentPlayMusic.imgUrl) {
          // 存在设置为写真背景
          that.bgColor = `url(${that.atPresentPlayMusic.imgUrl})`
        } else {
          // 不存在设置蓝色为全局背景
          that.bgColor = '#0096E6'
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
  @import "./assets/styles/common/functions";
#app {
  /*width: 100%;*/
  /*height: 100%;*/
  margin: 0 auto;
  width: 1004px;
  height: 670px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  /*background-size: cover;*/
  /*background-size: 100% 100%;*/
  /*border: 1px solid #eee;*/
  /*border-top-color:#0096E6;*/
  /*border-bottom-color:#0096E6;*/
  /*box-shadow: 0 0 1px #eee inset;*/
}
.route-container {
  flex: 1;
  /*height: px2vw(550);*/
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
