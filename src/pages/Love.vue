<template>
  <div class="main-love wh">
    <!--刚开始的页面-->
    <div class="first-off wh" v-if="startEnd" @click="index++">
      <transition name="fade">
        <div class="text one" v-if="index === 0">在这个特殊的<span class="big">地方</span></div>
      </transition>
      <transition name="move">
        <div class="text tow" v-if="index === 1">在这个特殊的<span class="big">时间</span></div>
      </transition>
      <transition name="move">
        <div class="text tow" v-if="index === 2">我相对<span class="big">某人</span>说</div>
      </transition>
      <transition name="move">
        <div class="text tow" v-if="index === 3"><span class="big">我</span>喜欢<span class="big">你</span>很<span class="big">久</span>了</div>
      </transition>
      <transition name="fade">
        <div class="text one" v-if="index === 4">下面是我对你<span class="big">表白</span>的内容</div>
      </transition>
      <div class="button">点击屏幕继续</div>
    </div>
    <!--第二页内容-->
    <div class="second-page wh" v-if="secondPage">
      <img id="flower" src="../assets/img/love2.png" style="display: none"/>
      <canvas ref="drawing" id="drawing" width="670" height="625"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Love',
  data () {
    return {
      index: 0,
      startEnd: true,
      secondPage: false
    }
  },
  watch: {
    index (e) {
      if (e === 5) {
        this.startEnd = false
        this.secondPage = true
        this.$nextTick(this.garden)
      }
    }
  },
  methods: {
    garden () {
      const that = this
      function draw () {
        const drawing = that.$refs.drawing
        const pic = document.getElementById('flower') // 获取描边图片
        let intervalId = null
        drawing.width = '520'
        drawing.height = '530'
        if (drawing.getContext) {
          let content = drawing.getContext('2d')
          let radian = 0
          let radianAdd = Math.PI / 40
          content.translate(250, 250)
          function heart () {
            const X = getX1(radian)
            const Y = getY1(radian)
            content.drawImage(pic, X, Y, 25, 25) // 在给定坐标绘制给定大小的图片
            radian += radianAdd
            if (radian > (2 * Math.PI)) { // 绘制完整的心型线后取消间歇调用
              clearInterval(intervalId)
            }
          }
          intervalId = setInterval(heart, 100) // 设置间歇调用，间隔为100ms
        }
      }

      function getX (t) { // 获取玫瑰线的X坐标
        return 100 * Math.sin(4 * t) * Math.cos(t)
      }

      function getY (t) { // 获取玫瑰线的Y坐标
        return 100 * Math.sin(4 * t) * Math.sin(t)
      }

      function getX1 (t) { // 获取心型线的X坐标
        return 15 * (16 * Math.pow(Math.sin(t), 3))
      }

      function getY1 (t) { // 获取心型线的Y坐标
        return -15 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
      }
      draw()
    }
  }
}
</script>

<style scoped lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity 2s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .move-enter-active, .move-leave-active {
    transition: all 2s;
    transform: translateY(0);
  }
  .move-enter, .move-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateY(-300px);
    opacity: 0;
  }
.main-love{
  .first-off{
    background: #f3961c;
    display: flex;
    justify-content: center;
    align-items: center;
    .text{
      position: absolute;
      color: #FFF;
      font-size: 25px;
      .big{
        font-size: 35px;
      }
    }
    .button{
      position: fixed;
      left: 50%;
      bottom: 10px;
      transform: translateX(-50%);
      width: 120px;
      height: 36px;
      padding: 5px;
      border: 1px solid #fff;
      text-align: center;
      line-height: 26px;
      font-size: 18px;
      border-radius: 5px;
      color: #fff;
    }
  }
}
</style>
