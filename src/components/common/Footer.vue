<template>
  <div class="footer w">
    <audio ref="audio"
           :src="url"
           @timeupdate="onTimeupdate"
           @loadedmetadata="onLoadedmetadata"
    ></audio>
    <div class="music-btn">
      <span class="icon cp">
        <i class="el-icon-arrow-left"></i>
      </span>
      <span class="play cp" @click="playMusic">
        <i class="el-icon-video-play" v-if="!isPlay"></i>
        <i class="el-icon-video-pause" v-else></i>
      </span>
      <span class="icon cp">
       <i class="el-icon-arrow-right"></i>
      </span>
    </div>
    <div class="progress-bar-wrap">
      <div class="bar-top">
        <span class="btn quality cp">标准<i class="el-icon-caret-top"></i></span>
        <span class="music-name">黄家驹-海阔天空</span>
        <span class="btn speed cp">倍速<i class="el-icon-caret-top"></i></span>
      </div>
      <div class="bar-bottom">
        <div class="progress-bar-main cp">
          <div class="progress-bar">
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
      <span class="icon">
        <i class="el-icon-headset"></i>
      </span>
      <span class="btn">
        <i class="green-dot"></i>
        丽音
      </span>
      <span class="ci">词</span>
      <el-badge :value="1" class="item" type="primary">
        <span class="comment">
          <i class="el-icon-chat-dot-square"></i>
        </span>
      </el-badge>
      <span class="icon last">
        <i class="el-icon-s-unfold"></i>
      </span>
      <span class="amount">288</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      url: 'http://m8.music.126.net/20191029160843/58023f8198722d37efd8d282e6f02c6b/ymusic/603f/2799/ea87/0ac26d0e219c049b2c5a12fd6be2826f.mp3',
      isPlay: false,
      // 音频当前播放时长
      currentTime: 0,
      // 音频最大播放时长
      maxTime: 0
    }
  },
  computed: {
    progressBarStyle () {
      const {currentTime, maxTime} = this
      return currentTime / maxTime * 290
    },
    dotStyle () {
      const {currentTime, maxTime} = this
      return currentTime / maxTime * 282
    }
  },
  methods: {
    playMusic () {
      if (this.isPlay) {
        this.$refs.audio.pause()
      } else {
        this.$refs.audio.play()
      }
      this.isPlay = !this.isPlay
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    onTimeupdate (res) {
      console.log('timeupdate')
      console.log(res)
      this.currentTime = res.target.currentTime
    },
    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据
    onLoadedmetadata (res) {
      console.log('loadedmetadata')
      console.log(res)
      this.maxTime = parseInt(res.target.duration)
    }
  },
  mounted () {
    // console.log(this.$refs.audio.duration)
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/common/functions";
  .footer{
    height: 70px;
    background: #0096E6;
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
      width: px2vw(415);
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
        }
      }
      .bar-bottom{
        flex: 1;
        display: flex;
        align-items: center;
        .progress-bar-main{
          width: px2vw(305);
          height: px2vw(2);
          position: relative;
          .progress-bar{
            width: px2vw(290);
            height: 100%;
            background: #fff;
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
          flex: 1;
        }
      }
    }
    .option-btn{
      padding-left: px2vw(30);
      display: flex;
      align-items: center;
      .icon{
        font-size: px2vw(25);
        margin-right: px2vw(15);
        cursor: pointer;
        &:hover{
          color: #fff;
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
