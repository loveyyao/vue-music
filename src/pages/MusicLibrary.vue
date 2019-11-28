<template>
  <div class="MusicLibrary w" :style="{height:windowH +'px'}">
    <el-tabs v-model="activeName"  @tab-click="handleClick">
      <el-tab-pane
        v-for="(item,index) in tabs"
        :label="item.label"
        :key="index"
        :name="index+''"></el-tab-pane>
    </el-tabs>
    <div class="content w" :style="{height:windowH - 40 +'px'}">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MusicLibrary',
  data () {
    return {
      tabs: [
        {
          label: '推荐',
          router: 'recommend'
        },
        {
          label: '排行榜',
          router: 'toplist'
        },
        {
          label: '歌手',
          router: 'singer'
        },
        {
          label: '分类',
          router: 'classify'
        }
      ],
      activeName: '0'
    }
  },
  computed: {
    windowH () {
      return this.$store.state.PC.windowH
    }
  },
  watch: {
    activeName (e) {
      if (e) {
        const path = this.tabs[e].router
        this.$router.replace('/home/musicLibrary/' + path)
        console.log(path)
      }
    }
  },
  methods: {
    handleClick () {}
  },
  mounted () {

  }
}
</script>

<style scoped lang="scss">
  .MusicLibrary{
    .content{
    }
  }
</style>
