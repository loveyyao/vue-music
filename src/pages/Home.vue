<template>
  <div class="app" :style="{backgroundImage:bgImage,backgroundSize:'100% 100%',backgroundColor:bgColor}">
    <Header/>
    <Body/>
    <Footer/>
  </div>
</template>

<script>
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import Body from '../components/common/Body'
export default {
  name: 'Home',
  data () {
    return {
      bgImage: '',
      bgColor: ''
    }
  },
  components: {
    Header,
    Footer,
    Body
  },

  computed: {
    picUrl () {
      return this.$store.state.picUrl
    },
    isShowBg () {
      return this.$store.state.isShowBg
    }
  },

  watch: {
    picUrl (e) {
      const that = this
      if (e) {
        // 判断是否存在歌手写真路劲
        const img = document.createElement('img')
        img.src = e
        img.onload = function () {
          console.log('背景加载好了')
          that.triggerBg()
        }
      }
    }
  },
  methods: {
    triggerBg () {
      const that = this
      if (this.isShowBg === '6') {
        that.$bus.$emit('setBg', true)
      }
    }
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
          that.bgImage = `url(${that.picUrl})`
        } else {
          // 不存在设置蓝色为全局背景
          that.bgImage = 'none'
          that.bgColor = '#41B883'
          // that.bgColor = `url(${that.picUrl}) center center`
        }
      } else {
        that.bgImage = 'none'
        that.bgColor = '#fff'
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/styles/common/functions";
  .app {
    /*margin: 0 auto;*/
    /*width: 1004px;*/
    width: 100%;
    height: 100%;
    /*height: 670px;*/
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 1px #000 inset;
    background-color: #fff;
    /*filter: brightness(0.8);*/
    /*background-color: #D79F00;*/
  }
  .route-container {
    flex: 1;
    border-right: 1px solid #eee;
    border-left: 1px solid #eee;
  }
</style>
