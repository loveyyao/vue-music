<template>
  <div class="mobile-hear wh">
    <div class="banner">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image.pic" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="tbs-list">
      <div class="tbs-item">
        <div class="icon-box">
          <div class="img">
            <img src="../../assets/img/mobile/music.png" alt="">
          </div>
        </div>
        <div class="text">乐库</div>
      </div>
      <div class="tbs-item">
        <div class="icon-box">
          <div class="img">
            <img src="../../assets/img/mobile/music.png" alt="">
          </div>
        </div>
        <div class="text">歌单</div>
      </div>
      <div class="tbs-item">
        <div class="icon-box">
          <div class="img">
            <img src="../../assets/img/mobile/music.png" alt="">
          </div>
        </div>
        <div class="text">电台</div>
      </div>
      <div class="tbs-item">
        <div class="icon-box">
          <div class="img">
            <img src="../../assets/img/mobile/music.png" alt="">
          </div>
        </div>
        <div class="text">猜你喜欢</div>
      </div>
      <div class="tbs-item">
        <div class="icon-box">
          <div class="img">
            <img src="../../assets/img/mobile/music.png" alt="">
          </div>
        </div>
        <div class="text">每日推荐</div>
      </div>
      <div class="tbs-item">
        <div class="icon-box">
          <div class="img">
            <img src="../../assets/img/mobile/music.png" alt="">
          </div>
        </div>
        <div class="text">更多</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hear',
  data () {
    return {
      images: []
    }
  },
  methods: {
    getBanner () {
      const that = this
      that.$axios.get('/banner', {
        type: 2
      })
        .then((res) => {
          // console.log(res)
          if (res.data.code === 200) {
            that.images = res.data.banners
          }
        })
    }
  },
  mounted () {
    this.getBanner()
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/common/functions";
  .mobile-hear{
    overflow-y: auto;
    .banner{
      width: 100%;
      height: rem(150);
    }
    .tbs-list{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .tbs-item{
        width: rem(100);
        margin: rem(5) auto;
        .icon-box{
          width: rem(70);
          height: rem(70);
          position: relative;
          background: rgba(0,0,0,.1);
          border-radius: 50%;
          margin: 0 auto;
          .img{
            width: rem(40);
            height: rem(40);
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            img{
              width: 100%;
              height: 100%;
            }
          }
        }
        .text{
          width: rem(70);
          text-align: center;
          margin: rem(3) auto;
        }
      }
    }
  }
</style>
