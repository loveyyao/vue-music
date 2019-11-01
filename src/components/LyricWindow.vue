<template>
  <div class="lyric-container">
    <div class="move-box ward"></div>
    <div class="icon cursor" @click="closeWindow">
      <i class="el-icon-close"></i>
    </div>
    {{lyric}}
<!--    haha-->
  </div>
</template>

<script>
export default {
  name: 'LyricWindow',
  data () {
    return {
      lyric: '',
      closeCb: null
    }
  },
  watch: {
    win (e) {
      // console.log(e.nowLyric)
    }
  },
  computed: {

  },
  methods: {
    // 点击关闭窗口（网页模式下点击包错，没有效果）
    closeWindow () {
      const win = nw.Window.get()
      // nw.App.close()
      // win.on('close')
      win.close()
      this.closeCb()
    },
    getLyric (e) {
      console.log(e.storageArea.nowLyric)
      this.lyric = e.storageArea.nowLyric.replace(/"/g, '')
    }
  },
  mounted () {
    window.onstorage = this.getLyric
    var win = nw.Window.get()
    // win.on('focus', function (e) {
    //   console.log(e)
    // })
    this.closeCb = win.closeWin
    // console.log(win.nowLyric)
    // console.log(window.global)
    // console.log(win)
    // win.on()
  }
}
</script>

<style scoped lang="scss">
.lyric-container{
  height: 70px;
  position: relative;
  font-size: 30px;
  line-height: 70px;
  text-align: center;
  transition: all .5s;
  color: red;
  /*background: rgba(0,0,0,.5);*/
  /*border: 2px solid #000;*/
  .move-box{
    width: 100%;
    height: 30px;
    /*background: red;*/
    position: absolute;
    top: 0;
    left: 0;
    cursor: move;
  }
  .icon{
    opacity: 0;
    transition: all .5s;
    position: absolute;
    top: 0;
    right: 10px;
  }
  &:hover{
    background: rgba(0,0,0,.5);
    .icon{
      opacity: 1;
    }
  }
}
</style>
