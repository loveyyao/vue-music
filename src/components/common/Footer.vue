<template>
  <div class="footer w" :style="{background: bgColor}">
    <audio ref="audio"
           :src="url"
           @timeupdate="onTimeupdate"
           @loadedmetadata="onLoadedmetadata"
           @ended="playEnd"
    ></audio>
    <div class="music-btn">
      <span class="icon cp" @click="playLastMusic">
        <i class="el-icon-arrow-left"></i>
      </span>
      <span class="play cp" @click="playMusic">
        <i class="el-icon-video-play" v-if="!isPlay"></i>
        <i class="el-icon-video-pause" v-else></i>
      </span>
      <span class="icon cp" @click="playNextMusic">
       <i class="el-icon-arrow-right"></i>
      </span>
    </div>
    <div class="progress-bar-wrap">
      <div class="bar-top">
        <span class="btn quality cp">标准<i class="el-icon-caret-top"></i></span>
        <marquee :loop="-1" class="music-name">{{atPresentPlayMusic.name}}</marquee>
        <span class="btn speed cp">倍速<i class="el-icon-caret-top"></i></span>
      </div>
      <div class="bar-bottom">
        <div class="progress-bar-main cp">
          <div class="progress-bar" ref="progressBar">
            <div class="progress-bar-inner" :style="{width:progressBarStyle + 'px'}"></div>
          </div>
          <div class="dot" :style="{left:dotStyle + 'px'}"></div>
        </div>
        <span class="time"><span>{{currentTime|realFormatSecond}}</span>/<span>{{maxTime|realFormatSecond}}</span></span>
      </div>
    </div>
    <div class="option-btn">
      <span class="icon">
        <i class="el-icon-star-off"></i>
      </span>
      <span class="icon">
        <i class="el-icon-download"></i>
      </span>
      <span class="icon">
        <i class="el-icon-sort"></i>
      </span>
      <span class="icon pr">
        <i class="el-icon-headset"></i>
        <div class="volume-main">
          <div class="volume-wrap">
            <div class="volume-inner" :style="{height: volumeBarH + 'px'}"></div>
            <div class="volume-dot" v-drag="setVolume" :style="{top:dotTop+'px'}"></div>
          </div>
        </div>
      </span>
      <span class="btn">
        <i class="green-dot"></i>
        丽音
      </span>
      <span class="ci">词</span>
      <el-badge :value="commentNum.total|FormattedNumber" class="item" type="primary">
        <span class="comment">
          <i class="el-icon-chat-dot-square"></i>
        </span>
      </el-badge>
      <span class="icon last">
        <i class="el-icon-s-unfold"></i>
      </span>
      <span class="amount">{{defaultList.length}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      url: '', // 音乐地址
      isPlay: false,
      // 音频当前播放时长
      currentTime: 0,
      // 音频最大播放时长
      maxTime: 0,
      volumeBarH: 35,
      bgColor: '#0096E6',
      dotTop: 0,
      progressBarW: 290
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
      return currentTime / maxTime * (this.progressBarW - 8)
    },
    // 从vuex中获取当前需要播放的音乐
    atPresentPlayMusic () {
      return this.$store.state.atPresent
    },
    defaultList () {
      return this.$store.state.defaultList
    },
    commentNum () {
      return this.$store.state.comment
    }
  },
  watch: {
    // 监视isPlay属性
    isPlay (e) {
      if (e) {
        // 为true时播放音乐
        this.$refs.audio.play()
      } else {
        // 暂停
        this.$refs.audio.pause()
      }
    },
    // 监视vuex中当前播放音乐属性
    atPresentPlayMusic (e) {
      const that = this
      // 当当前播放的音乐发生变化时，播放暂停
      this.isPlay = false
      // 请求变化后的音乐资源
      this.getSong(e.id, function () {
        that.isPlay = true
      })
    }
  },
  methods: {
    getProgressBarW () {
      const that = this
      that.progressBarW = that.$refs.progressBar.clientWidth
    },
    // 拖拽事件触发是调用的函数
    // el：当前元素 t：top的值 l：left的值
    setVolume (el, t, l) {
      var T = t
      T = T <= 0 ? 0 : T
      T = T >= 60 ? 60 : T
      this.dotTop = T
      // el.style.top = T + 'px'
      this.volumeBarH = (1 - T / 60) * 70
      var volumeVal = 1 - T / 60
      this.$refs.audio.volume = volumeVal
      this.$utils.setItem('volume', volumeVal)
    },
    // 请求当前播放音乐播放地址
    getSong (id, cb) {
      this.$axios.get('song/url', {id: id})
        .then((res) => {
          // console.log(res)
          if (res.data.code === 200) {
            // 请求回来后设置音乐播放地址
            // console.log(res.data)
            this.url = res.data.data[0].url
            setTimeout(() => {
              // 调用音乐播放函数
              cb && cb()
            }, 0)
          }
        })
      this.$axios.get('comment/music', {id: id})
        .then((res) => {
          console.log(res)
          if (res.data.code === 200) {
            this.$store.commit('addSongComment', res.data)
          }
        })
    },
    // 当前音乐资源播放完后触发的事件
    playEnd () {
      // 播放下一曲
      this.playNextMusic()
      console.log('音乐播放完了')
    },
    // 点击上一首
    playLastMusic () {
      // if (this.defaultList.length > 1) {
      //   this.$emit('last')
      // }
      const {atPresentPlayMusic, defaultList} = this
      let index = defaultList.indexOf(atPresentPlayMusic) - 1
      if (index < 0) {
        index = this.defaultList.length - 1
      }
      this.$bus.$emit('setPlayIndex', index)
      this.$store.commit('setAtPresentPlayMusic', defaultList[index])
    },
    // 点击下一首
    playNextMusic () {
      const {atPresentPlayMusic, defaultList} = this
      let index = defaultList.indexOf(atPresentPlayMusic) + 1
      if (index >= this.defaultList.length) {
        index = 0
      }
      this.$bus.$emit('setPlayIndex', index)
      this.$store.commit('setAtPresentPlayMusic', defaultList[index])
    },
    // 点击暂停和播放按钮
    playMusic () {
      this.isPlay = !this.isPlay
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    onTimeupdate (res) {
      // console.log('timeupdate')
      // console.log(res)
      this.currentTime = res.target.currentTime
    },
    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据（获取音乐总时长）
    onLoadedmetadata (res) {
      // console.log('loadedmetadata')
      // console.log(res)
      this.maxTime = parseInt(res.target.duration)
    }
  },
  mounted () {
    // console.log(this.$refs.audio.duration)
    // this.getSong(400162138)
    const that = this
    const volumeVal = this.$utils.getItem('volume')
    that.volumeBarH = volumeVal * 70
    that.dotTop = (1 - volumeVal) * 60
    that.$refs.audio.volume = volumeVal
    // 参数e为true时表示在歌词页面
    that.$bus.$on('setBg', function (e) {
      if (e) {
        // 当在歌词页的时候去除背景颜色
        that.bgColor = 'none'
      } else {
        // 当不在歌词页的时候设置背景颜色
        that.bgColor = '#0096E6'
      }
    })
    that.getProgressBarW()
    window.onresize = that.getProgressBarW
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/common/functions";
  .footer{
    height: 70px;
    display: flex;
    color: rgba(255,255,255,.8);
    .music-btn{
      width: px2vw(200);
      height: 100%;
      display: flex;
      align-items: center;
      padding-left: px2vw(15);
      font-size: px2vw(30);
      justify-content: space-between;
      .icon{
        width: px2vw(30);
        height: px2vw(30);
        text-align: center;
        line-height: px2vw(30);
        &:hover{
          color: #fff;
        }
      }
      .play{
        border: none;
        font-size: px2vw(40);
        &:hover{
          color: #fff;
        }
      }
    }
    .progress-bar-wrap{
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding-left: px2vw(30);
      .bar-top{
        flex: 1;
        display: flex;
        align-items: center;
        .btn{
          width: px2vw(52);
          height: px2vw(22);
          text-align: center;
          border: 1px solid rgba(255,255,255,.8);
          border-radius: px2vw(11);
          &:hover{
            color: #fff;
            border: 1px solid #fff;
          }
        }
        .music-name{
          padding: 0 px2vw(15);
          flex: 1;
          overflow: hidden;
          white-space: nowrap;
          /*text-overflow: ellipsis;*/
        }
      }
      .bar-bottom{
        flex: 1;
        display: flex;
        align-items: center;
        .progress-bar-main{
          flex: 1;
          height: px2vw(3);
          /*padding-right: px2vw(10);*/
          position: relative;
          .progress-bar{
            width: 100%;
            height: 100%;
            background: rgba(255,255,255,.7);
            .progress-bar-inner{
              width: px2vw(0);
              background: #00BCFF;
              height: 100%;
            }
          }
          .dot{
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #fff;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
          }
        }
        .time{
          text-align: right;
          width: px2vw(90);
        }
      }
    }
    .option-btn{
      width: px2vw(377);
      padding-left: px2vw(30);
      display: flex;
      align-items: center;
      .icon{
        font-size: px2vw(25);
        margin-right: px2vw(15);
        cursor: pointer;
        .volume-main{
          display: none;
          width: 16px;
          height: 80px;
          background: rgba(0,0,0,.7);
          border-radius: 8px;
          position: absolute;
          top: -80px;
          left: 50%;
          transform: translateX(-50%);
          .volume-wrap{
            width: 6px;
            height: 70px;
            position: absolute;
            bottom: 5px;
            left: 50%;
            transform: translateX(-50%);
            /*padding-bottom: 5px;*/
            background: #fff;
            border-radius: 3px;
            .volume-inner{
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 35px;
              background: #0096E6;
              border-radius: 3px;
            }
            .volume-dot{
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background: #fff;
              position: absolute;
              left: 50%;
              top: 30px;
              transform: translateX(-50%);
            }
          }
        }
        &:hover{
          color: #fff;
          .volume-main{
            display: block;
          }
        }
        &.last{
          margin-left: px2vw(15);
          margin-right: 0;
        }
      }
      .btn{
        cursor: pointer;
        width: px2vw(53);
        height: px2vw(22);
        text-align: center;
        border: 1px solid rgba(255,255,255,.8);
        border-radius: px2vw(11);
        .green-dot{
          display: inline-block;
          width: px2vw(10);
          height: px2vw(10);
          background: rgba(0,227,44,.8);
          border-radius: 50%;
        }
        &:hover{
          color: #fff;
          border: 1px solid #fff;
          .green-dot{
            background: #00E32C;
          }
        }
      }
      .ci{
        margin: 0 px2vw(15);
        font-weight: bold;
        font-size: px2vw(18);
        &:hover{
          color: #fff;
        }
      }
      .comment{
        font-size: px2vw(25);
        cursor: pointer;
        &:hover{
          color: #fff;
        }
      }
      .amount{}
    }
  }
</style>
