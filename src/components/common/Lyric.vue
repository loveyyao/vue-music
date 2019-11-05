<template>
  <div class="lyric-wrap">
    <ul class="lyric-list" :style="'transform: translateY(-'+top+'px);'">
      <li class="lyric-item"
          v-for="(item, i) in lyricList"
          :key="i"
          :class="{active:i===index}"
      >{{item}}</li>
    </ul>
    <div class="mask"></div>
    <div class="btn" @click="hideLeft">
      <i class="el-icon-arrow-down" v-if="isShowLeft"></i>
      <i class="el-icon-arrow-up" v-else></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Lyric',
  data () {
    return {
      isShowLeft: true
    }
  },
  watch: {
  },
  computed: {
    index () {
      return this.$store.state.index
    },
    top () {
      return this.$store.state.top
    },
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
    hideLeft () {
      this.isShowLeft = !this.isShowLeft
      this.$bus.$emit('hide', this.isShowLeft)
    }
  },
  mounted () {
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/styles/common/functions";
  .lyric-wrap{
    width: 100%;
    /*height: px2vw(530);*/
    height: 100%;
    overflow: hidden;
    position: relative;
    padding-top: 5px;
    /*padding: 10px 0;*/
    /*background: linear-gradient(#29bdd9, #276ace);*/
    .lyric-list{
      width: 100%;
      position: absolute;
      top: 50%;
      left: 0;
      transition: all .5s;
      .lyric-item{
        width: 100%;
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-size: 18px;
        font-weight: bolder;
        transition: all .5s;
        color: #fff;
        /*margin: 5px 0;*/
        &.active{
          color: orangered;
          font-size: 24px;
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
    .btn{
      width: 25px;
      height: 60px;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      background: rgba(0,0,0,.1);
      line-height: 60px;
      text-align: center;
      font-size: 25px;
      color: rgba(255,255,255,.4);
      transition: all .2s;
      i{
        transform: rotate(90deg);
      }
      &:hover{
        background: rgba(0,0,0,.5);
        color: #fff;
      }
    }
  }

</style>
