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
  </div>
</template>

<script>
export default {
  name: 'Lyric',
  data () {
    return {
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
  },
  mounted () {
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
        transition: all .5s;
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
