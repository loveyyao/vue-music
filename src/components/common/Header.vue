<template>
  <div class="header ward">
    <div class="header-left fl">
      <div class="user">
      </div>
      <div class="user-name">哈哈</div>
    </div>
    <div class="header-right fr">
      <span class="icon cursor">
        <i class="el-icon-arrow-left"></i>
        <span class="tooltip pa">返回</span>
      </span>
      <span class="icon cursor">
        <i class="el-icon-refresh"></i>
        <span class="tooltip pa">刷新</span>
      </span>
      <div class="search cursor">
        <el-input
          size="small"
          :placeholder="hostSearch.showKeyword"
          suffix-icon="el-icon-search"
          v-model="search"
          >
        </el-input>
      </div>
      <span class="icon cursor">
        <i class="el-icon-microphone"></i>
         <span class="tooltip pa">听歌识曲</span>
      </span>
      <span class="icon cursor ml">
        <i class="el-icon-aim"></i>
        <span class="tooltip pa">CD抓轨</span>
      </span>
      <span class="icon cursor">
        <i class="el-icon-menu"></i>
        <span class="tooltip pa">工具</span>
      </span>
      <span class="icon cursor">
        <i class="el-icon-message"></i>
        <span class="tooltip pa">消息中心</span>
      </span>
      <span class="icon cursor">
        <i class="el-icon-microphone"></i>
        <span class="tooltip pa">更换皮肤</span>
      </span>
      <span class="icon cursor">
        <i class="el-icon-setting"></i>
        <span class="tooltip pa">主菜单</span>
      </span>
      <span class="line"></span>
      <span class="icon cursor">
        <i class="el-icon-download rotate"></i>
        <span class="tooltip pa">隐藏音乐库</span>
      </span>
      <div class="icon cursor" @click="minWindow">
        <i class="el-icon-minus"></i>
        <span class="tooltip pa">最小化</span>
      </div>
      <div class="icon cursor" @click="closeWindow">
        <i class="el-icon-close"></i>
        <span class="tooltip pa">关闭</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      search: '',
      hostSearch: ''
    }
  },
  methods: {
    minWindow () {
      const win = nw.Window.get()
      win.minimize()
    },
    closeWindow () {
      nw.App.quit()
    }
  },
  mounted () {
    this.$axios.get('api/search/default')
      .then((res) => {
        if (res.data.code === 200) {
          this.hostSearch = res.data.data
        }
        console.log(res)
      })
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/common/functions";
  .header{
    width: 100%;
    height: 50px;
    background: #0096E6;
    .header-left{
      width: 30%;
      height: 100%;
      display: flex;
      /*justify-content: center;*/
      align-items: center;
      .user{
        width: px2vw(30);
        height: px2vw(30);
        border-radius: 50%;
        background: url("../../assets/img/logo.png") no-repeat;
        background-size: 100% 100%;
        margin: 0 px2vw(10);
      }
      .user-name{
        color: #fff;
      }
    }
    .header-right{
      width: 70%;
      height: 100%;
      display: flex;
      align-items: center;
      .icon{
        width: px2vw(30);
        height: px2vw(30);
        font-size: px2vw(20);
        line-height: px2vw(30);
        text-align: center;
        color: rgba(255,255,255,.8);
        margin: 0 px2vw(5);
        /*position: relative;*/
        .tooltip{
          display: none;
          height: px2vw(25);
          line-height: px2vw(25);
          font-size: 14px;
          background: #FFFEEB;
          color: #7E7D76;
          border: 1px solid #7E7D76;
          padding: 0 px2vw(5);
        }
        &.ml{
          margin-left: px2vw(30);
        }
        .rotate{
          transform: rotate(90deg);
        }
        &:last-child{
          .tooltip{
            padding: 0;
          }
        }
        &:hover {
          color: #fff;
          .tooltip{
            display: block;
          }
        }
      }
      .search{
        margin-right: px2vw(10);
      }
      .line{
        width: px2vw(2);
        height: px2vw(16);
        background: rgba(255,255,255,.8);
        margin: 0 px2vw(2);
      }
    }
  }
</style>
