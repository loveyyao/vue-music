<template>
  <div class="header ward" :style="{background:bgColor}">
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
      <div class="search cursor" @keydown.enter="searchSong">
        <el-input
          size="small"
          ref="searchInput"
          :placeholder="hostSearch.showKeyword"
          suffix-icon="el-icon-search"
          v-model="search"
          @focus="showSuggest=true"
          @blur="showSuggest=false"
          @change="suggest"
          >
        </el-input>
        <div class="search-suggest" v-show="showSuggest">
          <div class="songs suggest-list" v-if="searchSuggest.songs">
            <span class="title">单曲</span>
            <ul class="list">
              <li class="item" v-for="(item,index) in searchSuggest.songs" :key="index">
                <span class="name">{{item.name}}</span>
                <span class="artist" v-if="item.artists">{{item.artists[0].name}}</span>
              </li>
            </ul>
          </div>
          <div class="albums suggest-list" v-if="searchSuggest.albums">
            <span class="title">专辑</span>
            <ul class="list">
              <li class="item" v-for="(item,index) in searchSuggest.albums" :key="index">
                <span class="name">{{item.name}}</span>
                <span class="artist" v-if="item.artist">{{item.artist.name}}</span>
              </li>
            </ul>
          </div>
          <div class="mvs suggest-list" v-if="searchSuggest.mvs">
            <span class="title">MV</span>
            <ul class="list">
              <li class="item" v-for="(item,index) in searchSuggest.mvs" :key="index">
                <span class="name">{{item.name}}</span>
                <span class="artist">{{item.artistName}}</span>
              </li>
            </ul>
          </div>
        </div>
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
      search: '', // 搜索
      hostSearch: '', // 热门搜索
      searchSuggest: {}, // 关联搜索
      showSuggest: false, // 控制关联搜索显示
      bgColor: '#0096E6'
    }
  },
  methods: {
    // 点击最小化（在网页模式下会报错，点击没有效果）
    minWindow () {
      const win = nw.Window.get()
      win.minimize()
    },
    // 点击关闭窗口（网页模式下点击包错，没有效果）
    closeWindow () {
      nw.App.quit()
    },
    // 回车搜索
    searchSong () {
      const keywords = this.search
      // 触发输入框的失焦事件让关联搜索隐藏
      this.$refs.searchInput.blur()
      if (keywords.trim()) {
        // 触发事件显示搜索组件
        this.$bus.$emit('showSearch')
        // 发送请求
        this.$axios.get('search', {keywords})
          .then((res) => {
            if (res.data.code === 200) {
              // 把返回数据存储到vuex
              this.$store.commit('addData', res.data.result.songs)
              console.log(res.data.result.songs)
            }
          })
      }
    },
    // 关联搜索请求，当输入框内发生变化时触发
    suggest () {
      const keywords = this.search
      this.$axios.get('search/suggest', {keywords})
        .then((res) => {
          if (res.data.code === 200) {
            // this.$store.commit('addData', res.data.result.songs)
            console.log(res.data.result)
            this.searchSuggest = res.data.result
          }
        })
    }
  },
  mounted () {
    const that = this
    // 组件一加载开始请求默认搜索内容（热门搜索）
    that.$axios.get('search/default')
      .then((res) => {
        if (res.data.code === 200) {
          that.hostSearch = res.data.data
        }
        console.log(res)
      })
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
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/common/functions";
  .header{
    width: 100%;
    height: 50px;
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
        position: relative;
        .search-suggest{
          width: 100%;
          max-height: 300px;
          background: #fff;
          position: absolute;
          border-radius: 5px;
          border: 1px solid #eee;
          top: 100%;
          left: 0;
          z-index: 9;
          .suggest-list{
            padding: 5px 0;
            width: 100%;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #eee;
            .title{
              width: 50px;
              padding: 0 10px;
            }
            .list{
              flex: 1;
              .item{
                width: 100%;
                height: 30px;
                line-height: 30px;
                overflow: hidden;
                display: flex;
                padding-right: 5px;
                .name{
                  height: 100%;
                  width: 100px;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }
                .artist{
                  flex: 1;
                  height: 100%;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }
                &:hover{
                  background: #eee;
                }
              }
            }
          }
        }
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
