<template>
  <div class="mobile-header">
    <van-nav-bar
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <i class="el-icon-s-operation" slot="left"></i>
      <van-icon slot="right" name="plus" />
      <div slot="title">
        <van-tabs v-model="active" :border="false">
          <van-tab v-for="(e,i) in vanTabs"
                   :key="i"
                   :title="e.label"
                   :name="e.path"
          ></van-tab>
        </van-tabs>
      </div>
    </van-nav-bar>
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      direction="ltr"
      size="50%"
      :before-close="handleClose">
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      active: 'hear',
      drawer: false,
      vanTabs: [
        {
          path: 'me',
          label: '我'
        },
        {
          path: 'hear',
          label: '听'
        },
        {
          path: 'look',
          label: '看'
        },
        {
          path: 'sing',
          label: '唱'
        }
      ]
    }
  },
  watch: {
    active (e) {
      console.log(e)
      this.$router.replace('/mobile/home/' + e)
    }
  },
  methods: {
    onClickLeft () {
      this.drawer = true
    },
    onClickRight () {
    },
    handleClose (done) {
      done()
    }
  }
}
</script>

<style scoped>

</style>
