<template>
  <div class="mobile wh">
    <Header/>
    <div class="route-container w" :style="{height: windowH +'px'}">
      <router-view></router-view>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from '../../components/common/mobile/Header'
import Footer from '../../components/common/mobile/Footer'
export default {
  name: 'Home',
  data () {
    return {
      windowH: 0
    }
  },
  components: {
    Header,
    Footer
  },
  computed: {
  },
  mounted () {
    const that = this
    const isPc = that.$utils.IsPC()
    if (isPc) {
      that.$router.replace('/home/musicLibrary')
    } else {
      that.$router.replace('/mobile/home')
    }
    const H = document.documentElement.clientHeight
    this.windowH = H - 46
  }
}
</script>

<style scoped lang="scss">
.mobile{
}
</style>
