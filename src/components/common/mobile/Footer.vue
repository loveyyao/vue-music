<template>
  <div class="footer">
    <audio ref="audio"
           :src="url"
           @timeupdate="onTimeupdate"
           @loadedmetadata="onLoadedmetadata"
           @ended="playEnd"
    ></audio>
    <div class="img">
      <img v-lazy="imgSrc" alt="" v-if="imgSrc">
      <img src="../../../assets/img/logo.png" v-else alt="">
    </div>
    <div class="play-box">
      <div class="progress-bar-wrap">
        <div class="progress-bar" ref="progressBar">
          <div class="progress-bar-inner" :style="{width:progressBarStyle + 'px'}"></div>
        </div>
        <div class="dot" :style="{left:dotStyle + 'px'}"></div>
      </div>
      <div class="progress-bar-bottom">
        <div class="song-details">
          <div class="song-name">海阔天空</div>
          <div class="singer-name">黄家驹</div>
        </div>
        <div class="btns">
          <span>
            <i class="el-icon-video-play" v-if="!isPlay" @click="playMusic"></i>
            <i class="el-icon-video-pause" @click="playMusic" v-else></i>
          </span>
          <span>
            <i class="el-icon-arrow-right" @click="playNextMusic"></i>
          </span>
          <span>
            <i class="el-icon-s-unfold"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      url: '',
      currentTime: 0,
      maxTime: 0,
      isPlay: false,
      progressBarW: 0,
      imgSrc: ''
    }
  },
  computed: {
    // 计算播放进度条宽度
    progressBarStyle () {
      const {currentTime, maxTime} = this
      return currentTime / maxTime * this.progressBarW
    },
    // 计算小圆点的位置
    dotStyle () {
      const {currentTime, maxTime} = this
      return currentTime / maxTime * (this.progressBarW - 6)
    }
  },
  watch: {
    isPlay (e) {
      if (e) {
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    }
  },
  methods: {
    // 请求当前播放音乐播放地址
    getSong (id, cb) {
      this.$axios.get('song/url', {id: id})
        .then((res) => {
          // console.log(res)
          if (res.data.code === 200) {
            console.log(res.data)
            this.url = res.data.data[0].url
            setTimeout(() => {
              cb && cb()
            }, 0)
          }
        })
      // 获取歌手封面
      this.$axios.get('song/detail', {
        ids: id
      })
        .then((res) => {
          if (res.data.code === 200) {
            this.imgSrc = res.data.songs[0].al.picUrl
          }
        })
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    onTimeupdate (res) {
      let currentTime = res.target.currentTime
      this.currentTime = currentTime
      // const lyric = this.lyric
      // for (var t in lyric) {
      //   if (currentTime >= t && lyric[t].trim()) {
      //     this.nowLyric = t
      //     continue
      //   }
      // }
    },
    onLoadedmetadata (res) {
      // console.log('loadedmetadata')
      // console.log(res)
      this.maxTime = parseInt(res.target.duration)
    },
    playEnd () {
      // 播放下一曲
      this.playNextMusic()
      console.log('音乐播放完了')
    },
    // 点击下一首
    playNextMusic () {
      this.getSong(1385336748, () => {
        this.isPlay = true
      })
    },
    // 点击暂停和播放按钮
    playMusic () {
      if (this.url) {
        this.isPlay = !this.isPlay
      }
    }
  },
  mounted () {
    this.progressBarW = this.$refs.progressBar.clientWidth
  }
}
</script>

<style scoped lang="scss">
  @import "../../../assets/styles/common/functions";
.footer{
  width: 100%;
  height: rem(50);
  background: #41B883;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 0 rem(10);
  .img{
    width: rem(40);
    height: rem(40);
    border-radius: 50%;
    overflow: hidden;
    margin-right: rem(5);
    img{
      width: 100%;
      height: 100%;
    }
  }
  .play-box{
    height: 100%;
    flex: 1;
    padding-top: rem(5);
    .progress-bar-wrap{
      width: 100%;
      height: rem(3);
      margin-bottom: rem(5);
      position: relative;
      .progress-bar{
        width: 100%;
        height: 100%;
        background: #fff;
        border-radius: rem(1.5);
        .progress-bar-inner{
          width: rem(0);
          height: 100%;
          background: #00bcff;
        }
      }
      .dot{
        position: absolute;
        top: 50%;
        left: 0;
        width: rem(8);
        height: rem(8);
        transform: translateY(-50%);
        border-radius: 50%;
        background: #00bcff;
      }
    }
    .progress-bar-bottom{
      width: 100%;
      height: rem(40);
      /*background: green;*/
      display: flex;
      .song-details{
        width: 70%;
        height: 100%;
        .song-name{
          font-size: rem(14);
          color: #fff;
        }
        .singer-name{
          font-size: rem(12);
          color: rgba(255, 255, 255, 0.8);
        }
      }
      .btns{
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span{
          /*flex: 1;*/
          color: #fff;
          font-size: rem(20);
        }
      }
    }
  }
}
</style>
