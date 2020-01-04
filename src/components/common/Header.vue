<template>
  <div class="header ward" :style="{background:bgColor}">
    <div class="header-left fl">
      <div class="user-box pr">
        <div class="user cursor" @click="toLogin">
          <img src="../../assets/img/logo.png" alt="" v-if="!userInfo.img">
          <img v-lazy="userInfo.img" alt="" v-else>
        </div>
        <div class="user-name cursor" @click="toLogin">{{userInfo.name?userInfo.name:'未登录'}}</div>
        <div class="logout pa" v-if="showLogout">
          <span class="cursor" @click="logout">退出</span>
        </div>
      </div>
      <div class="btn" v-if="isMin">
        <span class="icon cursor" @click="max">
          <i class="el-icon-download rotate"></i>
          <span class="tooltip pa">显示音乐库</span>
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
    <div class="header-right fr" :class="{min:isMin}">
      <div class="section-left cursor">
        <span class="icon cursor" @click="goBack">
          <i class="el-icon-arrow-left"></i>
          <span class="tooltip pa">返回</span>
        </span>
        <span class="icon cursor">
            <i class="el-icon-refresh"></i>
            <span class="tooltip pa">刷新</span>
        </span>
        <div class="search cursor" @keydown.enter="searchSong" @click="searchClick">
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
      </div>
      <div class="section-right cursor">
        <span class="icon cursor">
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
          <i class="el-icon-setting"></i>
          <span class="tooltip pa">主菜单</span>
        </span>
        <span class="icon cursor" @click="download">
          <i class="el-icon-download"></i>
          <span class="tooltip pa">下载桌面端</span>
        </span>
        <span class="line"></span>
        <span class="icon cursor" @click="min">
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
    <el-dialog
      title="登录"
      custom-class="login-box"
      :visible.sync="centerDialogVisible"
      width="290px"
      top="20%"
      center>
      <div class="login-from">
        <el-input
          placeholder="请输入手机号码"
          v-model="phone">
        </el-input>
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="password">
        </el-input>
        <span class="dialog-footer">
          <el-button type="primary" @click="login">登录</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      phone: '',
      password: '',
      centerDialogVisible: false,
      search: '',
      hostSearch: {},
      searchSuggest: {},
      showSuggest: false,
      bgColor: '#41B883',
      timer: null,
      offset: 0,
      isMin: false,
      showLogout: false
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.PC.userInfo
    },
    token () {
      return this.$store.state.PC.token
    }
  },
  methods: {
    download () {
      window.location.href = 'http://121.40.142.20:3000/flies/setup.exe'
    },
    logout () {
      this.$axios.get('logout')
        .then((res) => {
          console.log(res)
          if (res.data.code === 200) {
            this.showLogout = !this.showLogout
            this.$store.commit('setToken', '')
            this.$store.commit('setUserInfo', {})
            this.$utils.setCookies('userInfo', JSON.stringify({}), 0)
            this.$utils.setCookies('token', JSON.stringify(''), 0)
            this.$message({
              type: 'success',
              message: '退出成功'
            })
          }
        })
    },
    login () {
      const that = this
      that.$axios.get('login/cellphone', {
        phone: that.phone,
        password: that.password
      })
        .then((res) => {
          console.log(res)
          if (res.data.code === 200) {
            console.log('用户登录')
            console.log(res.data)
            const token = JSON.parse(res.data.bindings[1].tokenJsonStr).access_token
            const userInfo = {
              id: res.data.profile.userId,
              name: res.data.profile.nickname,
              img: res.data.profile.avatarUrl
            }
            // console.log(token)
            that.$store.commit('setToken', token)
            that.$store.commit('setUserInfo', userInfo)
            that.$message({
              type: 'success',
              message: '登录成功'
            })
            that.centerDialogVisible = !that.centerDialogVisible
            that.$utils.setCookies('userInfo', JSON.stringify(userInfo), 7)
            that.$utils.setCookies('token', JSON.stringify(token), 7)
          }
        })
        .catch((err) => {
          console.log(err)
          that.$message.error('手机号码或者密码错误！')
        })
    },
    toLogin () {
      // this.$router.replace('/login')
      if (this.token) {
        this.showLogout = !this.showLogout
      } else {
        this.centerDialogVisible = !this.centerDialogVisible
      }
    },
    goBack () {
      this.$router.go(-1)
    },
    searchClick (e) {
      if (e.target.className === 'el-input__icon el-icon-search') {
        this.searchSong()
      }
    },
    // 点击最小化（在网页模式下会报错，点击没有效果）
    minWindow () {
      const win = nw.Window.get()
      if (win) {
        win.minimize()
      }
    },
    // 点击关闭窗口（网页模式下点击包错，没有效果）
    closeWindow () {
      if (nw) {
        nw.App.quit()
      }
    },
    max () {
      const win = nw.Window.get()
      this.isMin = !this.isMin
      this.$bus.$emit('min', this.isMin)
      win.setResizable(true)
      setTimeout(() => {
        win.setMinimumSize(1043)
        win.width = 1043
      }, 0)
      // console.log(this.isMin)
    },
    min () {
      const win = nw.Window.get()
      this.isMin = !this.isMin
      this.$bus.$emit('min', this.isMin)
      win.setMinimumSize(300)
      win.width = 300
      win.setResizable(false)
      console.log(this.isMin)
    },
    // 回车搜索
    searchSong () {
      let keywords = this.search
      const offset = this.offset
      // 触发输入框的失焦事件让关联搜索隐藏
      this.$refs.searchInput.blur()
      if (keywords === '') {
        keywords = this.hostSearch.realkeyword
      }
      if (keywords.trim()) {
        this.$store.commit('setSearchInfo', {
          keywords: keywords,
          offset: offset
        })
        // 触发事件显示搜索组件
        this.$bus.$emit('showSearch')
        this.$store.commit('delData', [])
        // 发送请求
        this.$axios.get('search', {
          keywords: keywords,
          offset: offset
        })
          .then((res) => {
            if (res.data.code === 200) {
              this.$store.commit('addData', res.data.result.songs)
              // console.log(res.data.result.songs)
            }
          })
      }
    },
    // 关联搜索请求，当输入框内发生变化时触发
    suggest () {
      const keywords = this.search
      if (keywords.trim()) {
        this.$axios.get('search/suggest', {keywords})
          .then((res) => {
            if (res.data.code === 200) {
              // this.$store.commit('addData', res.data.result.songs)
              // console.log(res.data.result)
              this.searchSuggest = res.data.result
            }
          })
      }
    }
  },
  mounted () {
    const that = this
    // 每隔一分钟请求一次搜索热词
    that.timer = setInterval(() => {
      // 组件一加载开始请求默认搜索内容（热门搜索）
      that.$axios.get('search/default')
        .then((res) => {
          if (res.data.code === 200) {
            that.hostSearch = res.data.data
          }
          // console.log(res)
        })
    }, 60000)
    // 参数e为true时表示在歌词页面
    that.$bus.$on('setBg', function (e) {
      if (e) {
        that.bgColor = 'rgba(0,0,0,.1)'
      } else {
        that.bgColor = '#41B883'
      }
    })
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/styles/common/functions";
  .header{
    width: 100%;
    height: 50px;
    display: flex;
    .tooltip{
      z-index: 9;
    }
    .header-left{
      width: 300px;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .user-box{
        height: 100%;
        display: flex;
        align-items: center;
      }
      .logout{
        top: 40px;
        left: 10px;
        background: #eee;
        padding: 5px 10px;
        color: red;
        z-index: 9;
      }
      .user{
        width: px2vw(30);
        height: px2vw(30);
        border-radius: 50%;
        /*background: url("../../assets/img/logo.png") no-repeat;*/
        /*background-size: 100% 100%;*/
        margin: 0 px2vw(10);
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .user-name{
        color: #fff;
      }
      .btn{
        width: 90px;
        display: flex;
        padding-right: 5px;
        .icon{
          flex: 1;
          height: px2vw(30);
          font-size: px2vw(20);
          line-height: px2vw(30);
          text-align: center;
          color: rgba(255,255,255,.8);
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
          .rotate{
            transform: rotate(-90deg);
          }
          &:hover {
            color: #fff;
            .tooltip{
              display: block;
            }
          }
          &:last-child{
            .tooltip{
              padding: 0;
            }
          }
        }
      }
    }
    .header-right{
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex: 1;
      opacity: 1;
      transition: all .5s;
      &.min{
        width: 0;
        opacity: 0;
      }
      .section-left{
        width: 390px;
        height: 100%;
        display: flex;
        align-items: center;
        .icon{
          margin: 0 5px;
        }
      }
      .section-right{
        width: 302px;
        height: 100%;
        display: flex;
        align-items: center;
        .icon{
          margin-left:px2vw(7);
        }
      }
      .icon{
        width: px2vw(30);
        height: px2vw(30);
        font-size: px2vw(20);
        line-height: px2vw(30);
        text-align: center;
        color: rgba(255,255,255,.8);
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
