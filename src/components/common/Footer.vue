<template>
  <div class="footer" :style="{background: bgColor,width:isMin?'300px':'100%'}">
    <audio ref="audio"
           :src="url"
           @timeupdate="onTimeupdate"
           @loadedmetadata="onLoadedmetadata"
           @ended="playEnd"
    ></audio>
    <div class="max" v-if="!isMin">
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
            <div class="progress-bar" ref="progressBar" v-click="progressBarClick">
              <div class="progress-bar-inner" :style="{width:progressBarStyle + 'px'}"></div>
            </div>
            <div class="dot" v-drag="setMusicCurrentTime" :style="{left:dotStyle + 'px'}"></div>
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
        <span class="icon" @click="triggerMode">
        <i class="el-icon-sort rotate" v-if="!isRandom"></i>
        <i class="random" v-else></i>
      </span>
        <span class="icon pr">
        <i class="el-icon-headset"></i>
        <div class="volume-main">
          <div class="volume-wrap" v-click="volumeClick">
            <div class="volume-inner" :style="{height: volumeBarH + 'px'}"></div>
            <div class="volume-dot" v-drag="setVolume" :style="{top:dotTop+'px'}"></div>
          </div>
        </div>
      </span>
        <span class="btn">
        <i class="green-dot"></i>
        丽音
      </span>
        <span class="ci cursor" @click="openChildWindow">词</span>
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
    <div class="min" v-else>
      <div class="music-info">
        <marquee :loop="-1" class="music-name">{{atPresentPlayMusic.name}}</marquee>
        <span class="time"><span>{{currentTime|realFormatSecond}}</span> / <span>{{maxTime|realFormatSecond}}</span></span>
      </div>
      <div class="btn">
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
        <div class="option-btn">
      <span class="icon">
        <i class="el-icon-star-off"></i>
      </span>
          <span class="icon">
        <i class="el-icon-download"></i>
      </span>
          <span class="icon" @click="triggerMode">
        <i class="el-icon-sort rotate" v-if="!isRandom"></i>
        <i class="random" v-else></i>
      </span>
          <span class="icon pr">
        <i class="el-icon-headset"></i>
        <div class="volume-main">
          <div class="volume-wrap" v-click="volumeClick">
            <div class="volume-inner" :style="{height: volumeBarH + 'px'}"></div>
            <div class="volume-dot" v-drag="setVolume" :style="{top:dotTop+'px'}"></div>
          </div>
        </div>
      </span>
          <span class="ci cursor" @click="openChildWindow">词</span>
        </div>
      </div>
      <div class="progress-bar-wrap">
        <div class="progress-bar-main cp">
          <div class="progress-bar" ref="progressBar" v-click="progressBarClick">
            <div class="progress-bar-inner" :style="{width:minProgressBarStyle + 'px'}"></div>
          </div>
          <div class="dot" v-drag="setMusicCurrentTime" :style="{left:minDotStyle + 'px'}"></div>
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
      isMin: false,
      url: '',
      isPlay: false,
      currentTime: 0,
      maxTime: 0,
      volumeBarH: 35,
      bgColor: '#41B883',
      dotTop: 0,
      progressBarW: 290,
      lyric: {},
      lyricIndex: 0,
      top: 0,
      nowLyric: '',
      windowUrl: '',
      isShowLyric: false,
      isRandom: false
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
    // 计算播放进度条宽度
    minProgressBarStyle () {
      const {currentTime, maxTime} = this
      return currentTime / maxTime * 300
    },
    // 计算小圆点的位置
    minDotStyle () {
      const {currentTime, maxTime} = this
      return currentTime / maxTime * (300 - 8)
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
    },
    lyricList () {
      const result = []
      const lyric = this.lyric
      for (var k in lyric) {
        if (lyric[k].trim()) {
          result.push(k)
        }
      }
      return result
    }
  },
  watch: {
    isMin (e) {
      this.getProgressBarW()
    },
    // 监视isPlay属性
    isPlay (e) {
      if (e) {
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
      this.$utils.setItem('playStatus', e)
    },
    // 监视vuex中当前播放音乐属性
    atPresentPlayMusic (e) {
      const that = this
      this.isPlay = false
      this.getSong(e.id, function () {
        that.isPlay = true
      })
    },
    nowLyric (e) {
      const lyric = this.lyricList
      let index = lyric.indexOf(e)
      this.lyricIndex = index
      this.top = (this.lyricIndex) * 60
      this.$store.commit('setLyricIndex', {index: this.lyricIndex, top: this.top})
      this.$utils.setItem('nowLyric', this.lyric[e])
    }
  },
  methods: {
    triggerMode () {
      this.isRandom = !this.isRandom
    },
    progressBarClick (el, x, y) {
      const maxTime = this.maxTime
      const progressBarW = this.progressBarW
      let L = x
      L = L <= 0 ? 0 : L
      L = L >= progressBarW ? progressBarW : L
      this.$refs.audio.currentTime = L / progressBarW * maxTime
    },
    // audio.currentTime
    setMusicCurrentTime (el, t, l) {
      const maxTime = this.maxTime
      const progressBarW = this.progressBarW
      let L = l
      L = L <= 0 ? 0 : L
      L = L >= progressBarW ? progressBarW : L
      this.$refs.audio.currentTime = L / progressBarW * maxTime
      // el.style.left = L + 'px'
    },
    // 点击调整声音大小
    volumeClick (el, x, y) {
      // console.log(el, x, y)
      this.dotTop = y
      this.volumeBarH = (1 - y / 60) * 70
      var volumeVal = 1 - y / 60
      this.$refs.audio.volume = volumeVal
      this.$utils.setItem('volume', volumeVal)
    },
    // 获取进度条的宽度
    getProgressBarW () {
      setTimeout(() => {
        const that = this
        that.progressBarW = that.$refs.progressBar.clientWidth
        console.log('窗口变化了', that.progressBarW)
      }, 0)
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
      this.lyricIndex = 0
      this.top = 0
      this.$store.commit('setLyricIndex', {index: this.lyricIndex, top: this.top})
      this.$axios.get('song/url', {id: id})
        .then((res) => {
          // console.log(res)
          if (res.data.code === 200) {
            // console.log(res.data)
            this.url = res.data.data[0].url
            setTimeout(() => {
              cb && cb()
            }, 0)
          }
        })
      // 获取歌曲评论
      this.$axios.get('comment/music', {id: id})
        .then((res) => {
          // console.log(res)
          if (res.data.code === 200) {
            this.$store.commit('addSongComment', res.data)
          }
        })
      // 获取歌曲歌词
      this.$axios.get('lyric', {id: id})
        .then((res) => {
          if (res.data.code === 200) {
            const result = res.data.lrc.lyric
            const lyric = this.parseLyric(result)
            this.lyric = lyric
            this.$store.commit('setLyric', lyric)
          }
        })
      // 获取歌手封面
      this.$axios.get('song/detail', {
        ids: id
      })
        .then((res) => {
          console.log(res.data)
          if (res.data.code === 200) {
            console.log(res.data.songs[0].al.picUrl)
            this.$store.commit('addPicUrl', res.data.songs[0].al.picUrl)
          }
        })
    },
    openChildWindow () {
      const that = this
      if (nw && !that.isShowLyric) {
        nw.Window.open(this.windowUrl + 'lyric', {
          width: 1004,
          height: 70,
          min_width: 1004,
          min_height: 70,
          max_width: 1004,
          max_height: 70,
          resizable: false,
          show_in_taskbar: false,
          always_on_top: true,
          fullscreen: false,
          frame: false,
          kiosk: false,
          transparent: true
        }, function (newWin) {
          // 监听新窗口焦点事件
          console.log(newWin)
          newWin.closeWin = that.childWindowClose
          newWin.playLastMusic = that.playLastMusic
          newWin.playMusic = that.playMusic
          newWin.playNextMusic = that.playNextMusic
        })
        that.isShowLyric = true
      }
    },
    childWindowClose () {
      this.isShowLyric = false
      console.log('歌词关闭了')
      // console.log(e)
    },
    // 歌词解析
    parseLyric (lrc) {
      var lyrics = lrc.split('\n')
      var lrcObj = {}
      for (var i = 0; i < lyrics.length; i++) {
        var lyric = decodeURIComponent(lyrics[i])
        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g
        var timeRegExpArr = lyric.match(timeReg)
        if (!timeRegExpArr) continue
        var clause = lyric.replace(timeReg, '')
        for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
          var t = timeRegExpArr[k]
          var min = Number(String(t.match(/\[\d*/i)).slice(1)),
            sec = Number(String(t.match(/\:\d*/i)).slice(1))
          var time = min * 60 + sec
          lrcObj[time] = clause
        }
      }
      return lrcObj
    },
    playEnd () {
      // 播放下一曲
      this.playNextMusic()
      console.log('音乐播放完了')
    },
    // 点击上一首
    playLastMusic () {
      const {atPresentPlayMusic, defaultList} = this
      let index = 0
      if (this.isRandom) {
        index = Math.floor(Math.random() * (this.defaultList.length - 1))
        if (index === defaultList.indexOf(atPresentPlayMusic)) {
          index = defaultList.indexOf(atPresentPlayMusic) - 1
          if (index < 0) {
            index = this.defaultList.length - 1
          }
        }
      } else {
        index = defaultList.indexOf(atPresentPlayMusic) - 1
        if (index < 0) {
          index = this.defaultList.length - 1
        }
      }
      this.$bus.$emit('setPlayIndex', index)
      this.$store.commit('setAtPresentPlayMusic', defaultList[index])
    },
    // 点击下一首
    playNextMusic () {
      const {atPresentPlayMusic, defaultList} = this
      let index = 0
      if (this.isRandom) {
        index = Math.floor(Math.random() * (this.defaultList.length - 1))
        if (index === defaultList.indexOf(atPresentPlayMusic)) {
          index = defaultList.indexOf(atPresentPlayMusic) + 1
          if (index >= this.defaultList.length) {
            index = 0
          }
        }
      } else {
        index = defaultList.indexOf(atPresentPlayMusic) + 1
        if (index >= this.defaultList.length) {
          index = 0
        }
      }
      console.log(index)
      this.$bus.$emit('setPlayIndex', index)
      this.$store.commit('setAtPresentPlayMusic', defaultList[index])
    },
    // 点击暂停和播放按钮
    playMusic () {
      if (this.url) {
        this.isPlay = !this.isPlay
      }
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    onTimeupdate (res) {
      // console.log('timeupdate')
      // console.log(res)
      let currentTime = res.target.currentTime
      this.currentTime = currentTime
      const lyric = this.lyric
      for (var t in lyric) {
        if (currentTime >= t && lyric[t].trim()) {
          this.nowLyric = t
          continue
        }
      }
    },
    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据（获取音乐总时长）
    onLoadedmetadata (res) {
      // console.log('loadedmetadata')
      // console.log(res)
      this.maxTime = parseInt(res.target.duration)
    },
    min (e) {
      this.isMin = e
    }
  },
  mounted () {
    const url = window.location.href
    const index = url.indexOf('home')
    console.log(index)
    this.windowUrl = url.slice(0, index)
    console.log(this.windowUrl)
    const that = this
    let volumeVal = this.$utils.getItem('volume')
    // console.log(volumeVal)
    if (volumeVal === null) {
      volumeVal = 0.5
    }
    that.volumeBarH = volumeVal * 70
    that.dotTop = (1 - volumeVal) * 60
    that.$refs.audio.volume = volumeVal
    // 参数e为true时表示在歌词页面
    that.$bus.$on('setBg', function (e) {
      if (e) {
        that.bgColor = 'rgba(0,0,0,.1)'
      } else {
        that.bgColor = '#41B883'
      }
    })
    that.getProgressBarW()
    // 当窗口发生变化时时时获取计算进度条最大宽度
    window.addEventListener('resize', that.getProgressBarW)
    // window.onresize = that.getProgressBarW
    // if (nw) {
    const win = nw.Window.get()
    win.on('resize', that.getProgressBarW)
    // }
    that.$bus.$on('min', that.min)
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/common/functions";
  .rotate{
    transform: rotate(90deg);
  }
  .footer{
    height: 70px;
    display: flex;
    color: rgba(255,255,255,.8);
    transition: all .5s;
    .max{
      /*display: none;*/
      width: 100%;
      display: flex;
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
          .random{
            margin-top: 6px;
            display: inline-block;
            width: 25px;
            height: 25px;
            background: url("../../../static/random-loop.svg");
            background-size: 100% 100%;
          }
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
            z-index: 10;
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
    .min{
      /*display: none;*/
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      .music-info{
        width: 100%;
        height: 20px;
        padding: 0 5px;
        line-height: 20px;
        display: flex;
        justify-content: space-around;
        .music-name{
          width: 200px;
          display: block;
          /*height: 100%;*/
        }
        .time{}
      }
      .btn{
        width: 100%;
        height: 30px;
        line-height: 25px;
        display: flex;
        font-size: 20px;
        .music-btn{
          width: 120px;
          padding-left: 5px;
          display: flex;
          .icon{
            flex: 1;
            &:hover{
              color: #fff;
            }
          }
          .play{
            flex: 1;
            font-size: 22px;
            &:hover{
              color: #fff;
            }
          }
        }
        .option-btn{
          flex: 1;
          display: flex;
          .icon{
            flex: 1;
            text-align: center;
            .random{
              /*margin-top: 6px;*/
              display: inline-block;
              width: 25px;
              height: 25px;
              background: url("../../../static/random-loop.svg");
              background-size: 100% 100%;
            }
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
              z-index: 10;
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
          }
          .ci{
            flex: 1;
            font-size: 18px;
          }
        }
      }
      .progress-bar-wrap{
        width: 100%;
        height: 2px;
        /*background: red;*/
        position: relative;
        .progress-bar-main{
          width: 100%;
          height: 100%;
          background: rgba(255,255,255,.7);
          .progress-bar{
            width: 100%;
            height: 100%;
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
      }
    }
  }
</style>
