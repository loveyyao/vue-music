<template>
  <div class="main wh">
    <div class="main-left pr h" :class="{border: showBorder,hidden:hide}">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane name="0">
          <span slot="label" class="tabs-icon"><i class="el-icon-headset"></i></span>
          <el-collapse v-model="collapseActive" accordion>
            <div class="list-container" :style="{height:listH+'px'}">
              <el-collapse-item :title="'默认列表 '+'[ '+defaultList.length+' ]'" name="1">
                <div class="music-list-wrap" :style="{height:listH -50 +'px'}">
                  <div class="music-item pr"
                       v-for="(item, index) in defaultList"
                       @dblclick="playMusic(defaultList,item,index)"
                       :key="index"
                       :class="{active:playIndex===index}"
                  >
                    <span class="icon cursor"><i class="el-icon-plus"></i></span>
                    <span class="music-mame">{{item.name}}</span>
                    <span class="music-time">{{item.time|realFormatSecond}}</span>
                    <span class="options pa pc">
                        <i class="el-icon-star-off cursor" @click.stop="addUserPlaylist(item)"></i>
                        <i class="el-icon-delete cursor" @click.stop="deleteMusic(index)"></i>
                        <i class="el-icon-more cursor"></i>
                      </span>
                  </div>
                </div>
              </el-collapse-item>
            </div>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane name="1">
          <span slot="label" class="tabs-icon"><i class="el-icon-cloudy"></i></span>
          <el-collapse v-model="collapseActive" accordion v-if="token" v-loading="loaderUser" :style="{height:listH -50 +'px'}">
            <div class="list-container" :style="{height:listH+'px'}">
              <el-collapse-item v-for="(e, i) in userPlaylist" :title="e.name+'[ '+e.num+' ]'" :name="i" :key="i">
                <div class="music-list-wrap">
                  <div class="music-item pr"
                       v-for="(item, index) in e.list"
                       @dblclick="playMusic(e.list,item,index)"
                       :key="index"
                       :class="{active:playIndex===index}"
                  >
                    <span class="icon cursor"><i class="el-icon-plus"></i></span>
                    <span class="music-mame">{{item.name}}</span>
                    <span class="music-time">{{item.time|realFormatSecond}}</span>
                    <span class="options pa pc">
                        <i class="el-icon-star-on cursor"></i>
                        <i class="el-icon-delete cursor" @click.stop="deleteMusic(index)"></i>
                        <i class="el-icon-more cursor"></i>
                      </span>
                  </div>
                </div>
              </el-collapse-item>
            </div>
          </el-collapse>
          <div v-else>未登录哦</div>
        </el-tab-pane>
        <el-tab-pane name="2">
          <span slot="label" class="tabs-icon"><i class="el-icon-connection"></i></span>
          待开发
        </el-tab-pane>
        <el-tab-pane name="3">
          <span slot="label" class="tabs-icon"><i class="el-icon-mobile"></i></span>
          待开发
        </el-tab-pane>
        <el-tab-pane name="4">
          <span slot="label" class="tabs-icon"><i class="el-icon-download"></i></span>
          待开发
        </el-tab-pane>
      </el-tabs>
      <div class="line"></div>
    </div>
    <div class="main-right pr h" :class="{min:isMin}" v-if="!isMin">
      <el-tabs v-model="rightActiveName" @tab-click="handleClick">
        <el-tab-pane v-for="(tab,index) in tabs"
                     :label="tab.label"
                     :name="index + ''"
                     :key="index"></el-tab-pane>
      </el-tabs>
      <!--<Search v-if="!rightActiveName"></Search>-->
      <!--<Lyric v-if="rightActiveName==='6'"></Lyric>-->
      <!--<MusicLibrary v-if="rightActiveName==='0'"></MusicLibrary>-->
      <router-view></router-view>
      <div class="line" v-show="showLine"></div>
    </div>
    <el-dialog
      title="添加到"
      :visible.sync="dialogVisible"
      custom-class="add-box"
      width="30%"
      >
      <div class="add-main">
        <el-tree :data="playlist"
                 show-checkbox
                 ref="tree"
                 empty-text="您还没有歌单哦，请先创建歌单"
                 @node-click="handleNodeClick">
        </el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="getCheckedNodes">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: [],

  data () {
    return {
      addData: {},
      dialogVisible: false,
      tabs: [
        {
          label: '乐库',
          router: 'musicLibrary'
        },
        {
          label: '电台',
          router: 'broadcastingStation'
        },
        {
          label: '歌单',
          router: 'songList'
        },
        {
          label: 'MV',
          router: 'mv'
        },
        {
          label: '直播',
          router: 'liveStreaming'
        },
        {
          label: 'KTV',
          router: 'ktv'
        },
        {
          label: '歌词',
          router: 'lyric'
        }
      ],
      rightActiveName: '0',
      activeName: '0',
      collapseActive: '',
      playIndex: null,
      showBorder: true,
      showLine: true,
      listH: 0,
      hide: false,
      isMin: false,
      playlist: [],
      userPlaylist: [],
      loaderUser: true
    }
  },

  computed: {
    // 获取默认播放列表
    playList () {
      return this.$store.state.playList
    },
    defaultList () {
      return this.$store.state.defaultList
    },
    atPresentPlayMusic () {
      return this.$store.state.atPresent
    },
    token () {
      return this.$store.state.token
    },
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  watch: {
    defaultList (e) {
      this.$utils.setItem('defaultList', e)
    },
    playIndex (e) {
      this.$store.commit('setAtPresentPlayMusic', this.playList[e])
      this.$utils.setItem('nowLyric', '')
    },
    // 监视rightActiveName的值
    rightActiveName (e) {
      if (e) {
        const path = this.tabs[e].router
        this.$router.replace('/home/' + path)
        console.log(path)
      }
      // 当值为六的时候触发更换页面背景
      if (e === '6') {
        this.$bus.$emit('setBg', true)
        this.showBorder = false
        this.showLine = false
      } else {
        // 不为6的时候背景切换回来
        this.$bus.$emit('setBg', false)
        this.showBorder = true
        this.showLine = true
        this.hide = false
      }
    },
    activeName (e) {
      if (e === '1') {
        this.getUserSongs()
      }
    }
  },
  methods: {
    getCheckedNodes () {
      // console.log(this.$refs.tree.getCheckedNodes())
      const ids = this.$refs.tree.getCheckedNodes()
      console.log(ids)
      // this.dialogVisible = false
      if (ids.length) {
        ids.forEach((e) => {
          const id = e.id
          this.$axios.get('playlist/tracks', {
            op: 'add',
            pid: id,
            tracks: this.addData.id
          })
            .then((res) => {
              if (res.data.code === 200) {
                this.$message({
                  type: 'success',
                  message: '添加成功'
                })
                this.dialogVisible = false
                this.getUserSongs()
              }
            })
        })
      } else {
        this.$message.error('请选择歌单')
      }
    },
    handleNodeClick (data) {
      console.log(data)
    },
    addUserPlaylist (data) {
      if (this.token) {
        this.getUserSongs()
        this.addData = data
        this.dialogVisible = true
      } else {
        this.$message.error('尚未登录哦，请先登录')
      }
    },
    getUserSongs () {
      if (this.token) {
        this.$axios.get('user/playlist', {
          uid: this.userInfo.id
        })
          .then((res) => {
            // console.log(res)
            if (res.data.code === 200) {
              this.playlist = res.data.playlist.map((e) => {
                return {
                  id: e.id,
                  name: e.name,
                  label: e.name
                }
              })
              console.log(res.data.playlist)
              this.playlist.forEach((e) => {
                this.getPlaylistDetail(e.id)
              })
            }
          })
      } else {
        // this.$message.error('尚未登录哦，请先登录')
      }
    },
    getPlaylistDetail (id) {
      this.$axios.get('/playlist/detail', {
        id: id
      })
        .then((res) => {
          // console.log(res)
          if (res.data.code === 200) {
            console.log(res.data.playlist.tracks)
            const songList = res.data.playlist.tracks.map((e) => {
              return {
                name: e.name,
                id: e.id,
                time: e.dt / 1000
              }
            })
            this.userPlaylist = this.playlist.map((e) => {
              if (e.id === id) {
                e.list = songList
                e.num = songList.length
              }
              return e
            })
            this.loaderUser = false
          }
        })
    },
    handleClick (e) {
      console.log(e.label)
      this.$store.commit('setShowBg', this.rightActiveName)
    },
    playMusic (list, data, index) {
      this.$store.commit('setPlayList', list)
      this.playIndex = index
      this.$store.commit('setAtPresentPlayMusic', data)
    },
    // 点击删除图标
    deleteMusic (index) {
      if (index < this.playIndex) {
        this.playIndex = this.playIndex - 1
      }
      this.$store.commit('delMusic', index)
    },
    getWindowWH () {
      const H = document.documentElement.clientHeight
      this.listH = H - 143
      this.$store.commit('setWindowH', this.listH)
      console.log(H)
    },
    min (e) {
      this.isMin = e
    }
  },
  created () {
    // console.log('')
  },
  mounted () {
    const that = this
    that.getWindowWH()
    that.$bus.$on('hide', function (e) {
      that.hide = !e
    })
    that.$bus.$on('min', that.min)
    // 绑定一个触发搜索列表组件显示的方法
    that.$bus.$on('showSearch', function () {
      that.rightActiveName = ''
      that.$router.replace('/home/search')
      // that.rightActiveName = '7'
      // this.$store.commit('setShowBg', that.rightActiveName)
    })
    that.$bus.$on('setPlayIndex', function (index) {
      that.playIndex = index
    })
    window.addEventListener('resize', that.getWindowWH)
    // window.onresize = that.getWindowWH
    if (nw) {
      const win = nw.Window.get()
      win.on('resize', that.getWindowWH)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/styles/common/functions";
  .main{
    display: flex;
    /*background-color:#fff;*/
    .main-left{
      width: 300px;
      border-right: 2px solid transparent;
      background: rgba(255,255,255,.3);
      overflow: hidden;
      transition: all .5s;
      opacity: 1;
      /*padding-left: px2vw(10);*/
      &.hidden{
        opacity: 0;
        width: 0;
      }
      &.border{
        border-color: #eee;
      }
      .tabs-icon{
        font-size: 20px;
      }
      .list-container{
        width: 100%;
        /*height: px2vw(529);*/
        /*height: 100%;*/
        overflow-y: auto;
        .music-list-wrap{
          width: 100%;
          overflow-y: auto;
          .music-item{
            width: 100%;
            height: px2vw(40);
            padding-left: px2vw(5);
            display: flex;
            align-items: center;
            &.active{
              background: rgba(238,238,238,.5);
            }
            .icon{
              opacity: 0;
              transition: opacity .1s;
              margin-right: 5px;
            }
            .music-mame{
              line-height: px2vw(40);
              display: inline-block;
              width: 185px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .music-time{
              opacity: 1;
              transition: opacity .1s;
            }
            .options{
              top: 50%;
              right: px2vw(30);
              transform: translateY(-50%);
              /*display: none;*/
              opacity: 0;
              transition: opacity .1s;
              i{
                margin-left: px2vw(5);
              }
            }
            &:hover{
              background: rgba(238,238,238,.5);
              .icon{
                opacity: 1;
              }
              .music-time{
                /*display: none;*/
                opacity: 0;
              }
              .options{
                opacity: 1;
              }
            }
          }
        }
      }
    }
    .main-right{
      height: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      flex: 1;
      opacity: 1;
      transition: all .5s;
      &.min{
        width: 0;
        opacity: 0;
      }
    }
    .line{
      width: 100%;
      height: 2px;
      background: #eee;
      position: absolute;
      top: 38px;
      left: 0;
    }
  }
</style>
