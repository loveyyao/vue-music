<template>
  <div class="lyric-container">
    <div class="move-box ward"></div>
    <div class="icon cursor" @click="closeWindow">
      <i class="el-icon-close"></i>
    </div>
    <div class="music-btn cp">
      <span class="icon-btn cursor" @click="playLastMusic">
        <i class="el-icon-arrow-left"></i>
      </span>
      <span class="play-btn cursor" @click="playMusic">
        <i class="el-icon-video-play" v-if="!isPlay"></i>
        <i class="el-icon-video-pause" v-else></i>
      </span>
      <span class="icon-btn cursor" @click="playNextMusic">
       <i class="el-icon-arrow-right"></i>
      </span>
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
      closeCb: null,
      playLastMusic: null,
      playMusic: null,
      playNextMusic: null,
      isPlay: false
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
      if (win) {
        win.close()
        this.closeCb()
      }
      // nw.App.close()
      // win.on('close')
    },
    getLyric (e) {
      console.log(e.storageArea.playStatus) // 字符串的 false 和true
      if (e.storageArea.playStatus === 'false') {
        this.isPlay = false
      } else {
        this.isPlay = true
      }
      this.lyric = e.storageArea.nowLyric.replace(/"/g, '')
    }
  },
  mounted () {
    window.onstorage = this.getLyric
    var win = nw.Window.get()
    this.closeCb = win.closeWin
    this.playLastMusic = win.playLastMusic
    this.playMusic = win.playMusic
    this.playNextMusic = win.playNextMusic
    // console.log(win.nowLyric)
    // console.log(window.global)
    const flag = this.$utils.getItem('playStatus')
    this.lyric = this.$utils.getItem('nowLyric')
    if (flag === 'false') {
      this.isPlay = false
    } else {
      this.isPlay = true
    }
    console.log(win)
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
    /*background: #fff;*/
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
  }
  .icon{
    opacity: 0;
    transition: all .5s;
    position: absolute;
    top: 0;
    right: 10px;
  }
  .music-btn{
    opacity: 0;
    transition: all .5s;
    width: 250px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    color: rgba(255,255,255,.5);
    .icon-btn{
      flex: 1;
    }
    .play-btn{
      font-size: 35px;
      flex: 1;
    }
  }
  &:hover{
    background: rgba(0,0,0,.5);
    .icon{
      opacity: 1;
    }
    .music-btn{
      opacity: 1;
      color: #fff;
    }
  }
}
</style>
