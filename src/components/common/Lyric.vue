<template>
  <div class="lyric-wrap">
    <ul class="lyric-list" :style="'transform: translateY(-'+top+'px);'">
      <li class="lyric-item"
          v-for="(item, index) in lyricList"
          :key="index"
          :class="{active:index===lyricIndex}"
      >{{item}}</li>
    </ul>
    <div class="mask"></div>
  </div>
</template>

<script>
export default {
  name: 'Lyric',
  data () {
    return {
      lyricIndex: 0,
      top: 0,
      nowLyric: ''
    }
  },
  watch: {
    nowLyric (e) {
      const index = this.lyricList.indexOf(e)
      this.lyricIndex = index
      this.top = index * 30
    }
  },
  computed: {
    lyric () {
      return this.$store.state.lyric
    },
    lyricList () {
      const result = []
      const lyric = this.lyric
      for (var k in lyric) {
        if (lyric[k].trim()) {
          result.push(lyric[k])
        }
      }
      return result
    }
  },
  methods: {
    setLyric (currentTime) {
      const lyric = this.lyric
      for (var t in lyric) {
        if (currentTime >= t && lyric[t].trim()) {
          // console.log(lyric[t])
          // this.lyricIndex = this.lyricIndex + 1
          // this.top = (this.lyricIndex + 1) * 30
          this.nowLyric = lyric[t]
          continue
        }
      }
    }
  },
  mounted () {
    this.$bus.$on('setLyric', this.setLyric)
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/styles/common/functions";
  .lyric-wrap{
    width: 100%;
    height: px2vw(511);
    overflow: hidden;
    position: relative;
    padding-top: 5px;
    /*padding: 10px 0;*/
    background: linear-gradient(#29bdd9, #276ace);
    .lyric-list{
      width: 100%;
      position: absolute;
      top: 50%;
      left: 0;
      transition: all .5s;
      .lyric-item{
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 18px;
        font-weight: bolder;
        color: #fff;
        /*margin: 5px 0;*/
        &.active{
          color: orangered;
          font-size: 20px;
        }
      }
    }
    .mask{
      display: none;
      width: 100%;
      height: 30px;
      position: absolute;
      top: 50%;
      left: 0;
      background: rgba(255,255,255,.5);
    }
  }

</style>
