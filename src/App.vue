<template>
  <div id="app" :style="{background:bgColor}">
    <div class="route-container wh">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      bgColor: 'transparent'
    }
  },
  components: {
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
    // const defaultList = this.$utils.getItem('defaultList')
    // that.$store.commit('addDefaultList', defaultList)
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
        that.bgColor = 'transparent'
      }
    })
    // 创建托盘图标
    var tray = new nw.Tray({ title: 'vue-music', icon: '/static/logo.png', tooltip: 'vue-music' })

    // 创建托盘菜单
    var menu = new nw.Menu()
    menu.append(new nw.MenuItem({ type: 'checkbox', label: 'box1' }))
    tray.menu = menu
  },

  methods: {
  },
  destroyed () {
    this.$utils.removeItem('nowLyric')
    this.$utils.removeItem('playStatus')
  }
}
</script>

<style lang="scss" scoped>
  @import "./assets/styles/common/functions";
#app {
  margin: 0 auto;
  /*width: 1004px;*/
  width: 100%;
  /*height: 670px;*/
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow: hidden;
  display: flex;
  background: transparent;
  flex-direction: column;
  /*border-right: 1px solid #eee;*/
  /*border-left: 1px solid #eee;*/
}
.route-container {
}
</style>
