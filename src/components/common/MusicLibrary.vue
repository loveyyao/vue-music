<template>
  <div class="MusicLibrary w" :style="{height:windowH +'px'}">
    <el-tabs v-model="activeName"  @tab-click="handleClick">
      <el-tab-pane label="推荐" name="0"></el-tab-pane>
      <el-tab-pane label="排行榜" name="1"></el-tab-pane>
      <el-tab-pane label="歌手" name="2">待开发</el-tab-pane>
      <el-tab-pane label="分类" name="3">待开发</el-tab-pane>
    </el-tabs>
    <div class="content w" :style="{height:windowH - 40 +'px'}">
      <div class="recommend wh" v-if="activeName==='0'">
        <div class="section w">
          <div class="content-left">
            <div class="left-title">
              <span class="text">新歌速递</span>
              <el-tabs v-model="newSongType"  @tab-click="handleClick">
                <el-tab-pane label="全部" name="0"></el-tab-pane>
                <el-tab-pane label="华语" name="7"></el-tab-pane>
                <el-tab-pane label="欧美" name="96"></el-tab-pane>
                <el-tab-pane label="日本" name="8"></el-tab-pane>
                <el-tab-pane label="韩国" name="16"></el-tab-pane>
              </el-tabs>
            </div>
            <div class="new-song-list" v-loading="loadingSong">
              <div class="new-item" v-for="(item, index) in newSongData" :key="index">
                <span class="name">{{item.name}}</span>
                <div class="time">{{item.time|realFormatSecond}}</div>
                <div class="option">
                  <i class="el-icon-caret-right cursor" @click="playCellMusic(item)"></i>
                  <i class="el-icon-plus cursor" @click="addDefaultList(item)"></i>
                  <i class="el-icon-download cursor"></i>
                </div>
              </div>
            </div>
            <el-pagination
              small
              :page-size="pageSize"
              :current-page="currentPage"
              @current-change="CurrentChange"
              layout="prev, pager, next"
              :total="newAllSongData.length">
            </el-pagination>
          </div>
          <div class="content-right">
            <div class="right-title">
              <span class="text">新碟上架</span>
              <span>更多</span>
            </div>
            <div class="new-album-list" v-loading="loadingAlbum">
              <div class="album-item" v-for="(item,index) in albumData" :key="index" :class="{mt:index>1}">
                <div class="album-img">
                  <img v-lazy="item.img" alt="">
                  <div class="user">
                    <i class="el-icon-user"></i>
                    <span>{{item.user}}</span>
                  </div>
                  <div class="playCount">
                    <i class="el-icon-headset"></i>
                    <span>{{item.playCount}}</span>
                  </div>
                  <div class="play">
                    <i class="el-icon-video-play"></i>
                  </div>
                </div>
                <div class="album-name">{{item.name}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="recommend-singer w">
          <div class="singer-title w">
            <span class="text">推荐歌手</span>
          </div>
          <div class="singer-list w" v-loading="loadingSinger">
            <div class="singer-item" v-for="(item,index) in singerList" :key="index">
              <div class="singer-img">
                <img v-lazy="item.img1v1Url" alt="">
              </div>
              <span class="singer-name">{{item.name}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="toplist-wrap wh" v-if="activeName==='1'">
        <div class="toplist-title h">
          <div class="title">热门榜单</div>
          <ul class="list wh">
            <li class="item" v-for="(item,index) in toplist"
                :class="{active:toplistValue===item.value}"
                @click="getTopList(item.value)"
                :key="index">{{item.label}}</li>
          </ul>
        </div>
        <div class="toplist h" v-loading="loadingTopList">
          <div class="title">{{toplistDescription}}</div>
          <div class="top-list wh">
            <div class="top-item" v-for="(item, index) in toplistData" :key="index">
              <span class="top-number" :class="{red:index<5}">{{index+1}}</span>
              <span class="name">{{item.name}}</span>
              <div class="time">{{item.time|realFormatSecond}}</div>
              <div class="option">
                <i class="el-icon-caret-right cursor" @click="playCellMusic(item)"></i>
                <i class="el-icon-plus cursor" @click="addDefaultList(item)"></i>
                <i class="el-icon-download cursor"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MusicLibrary',
  data () {
    return {
      id: null,
      activeName: '0',
      newSongType: '0',
      currentPage: 1,
      pageSize: 6,
      newAllSongData: [],
      albumData: [],
      singerList: [],
      loadingSong: true,
      loadingAlbum: true,
      loadingSinger: true,
      loadingTopList: true,
      toplistValue: 0,
      toplist: [
        {
          label: '云音乐新歌榜',
          value: 0
        },
        {
          label: '云音乐热歌榜',
          value: 1
        },
        {
          label: '网易原创歌曲榜',
          value: 2
        },
        {
          label: '云音乐飙升榜',
          value: 3
        },
        {
          label: '云音乐电音榜',
          value: 4
        },
        {
          label: 'UK排行榜周榜',
          value: 5
        },
        {
          label: '美国Billboard周榜',
          value: 6
        },
        {
          label: 'KTV嗨榜',
          value: 7
        },
        {
          label: 'iTunes榜',
          value: 8
        },
        {
          label: 'Hit FM Top榜',
          value: 9
        },
        {
          label: '日本Oricon周榜',
          value: 10
        },
        {
          label: '韩国Melon排行榜周榜',
          value: 11
        },
        {
          label: '韩国Mnet排行榜周榜',
          value: 12
        },
        {
          label: '韩国Melon原声周榜',
          value: 13
        },
        {
          label: '中国TOP排行榜(港台榜)',
          value: 14
        },
        {
          label: '中国TOP排行榜(内地榜)',
          value: 15
        },
        {
          label: '香港电台中文歌曲龙虎榜',
          value: 16
        },
        {
          label: '华语金曲榜',
          value: 17
        },
        {
          label: '中国嘻哈榜',
          value: 18
        },
        {
          label: '法国 NRJ EuroHot 30周榜',
          value: 19
        },
        {
          label: '台湾Hito排行榜',
          value: 20
        },
        {
          label: 'Beatport全球电子舞曲榜',
          value: 21
        },
        {
          label: '云音乐ACG音乐榜',
          value: 22
        },
        {
          label: '云音乐说唱榜',
          value: 23
        },
        {
          label: '云音乐古典音乐榜',
          value: 24
        },
        {
          label: '云音乐电音榜',
          value: 25
        },
        {
          label: '抖音排行榜',
          value: 26
        },
        {
          label: '新声榜',
          value: 27
        },
        {
          label: '云音乐韩语榜',
          value: 28
        },
        {
          label: '英国Q杂志中文版周榜',
          value: 29
        },
        {
          label: '电竞音乐榜',
          value: 30
        },
        {
          label: '云音乐欧美热歌榜',
          value: 31
        },
        {
          label: '云音乐欧美新歌榜',
          value: 32
        },
        {
          label: '说唱TOP榜',
          value: 33
        }
      ],
      toplistData: [],
      toplistDescription: ''
    }
  },
  computed: {
    windowH () {
      return this.$store.state.windowH
    },
    newSongData () {
      const that = this
      const data = that.newAllSongData
      const result = data.slice((that.currentPage - 1) * that.pageSize, that.currentPage * that.pageSize)
      return result
    },
    defaultList () {
      return this.$store.state.defaultList
    }
  },
  watch: {
    newSongType (e) {
      if (e) {
        this.getSongData(e)
      }
    }
  },
  methods: {
    getTopList (val) {
      this.toplistValue = val
      this.loadingTopList = true
      this.$axios.get('/top/list', {idx: val})
        .then((res) => {
          if (res.data.code === 200) {
            // console.log(res.data.playlist.description)
            const result = res.data.playlist.tracks.map((item) => {
              return {
                id: item.id,
                time: item.dt / 1000,
                name: item.name
              }
            })
            this.toplistDescription = res.data.playlist.description
            this.toplistData = result
            this.loadingTopList = false
          }
        })
    },
    // 点击加号添加到默认列表
    addDefaultList (row) {
      if (this.id !== row.id) {
        this.$axios.get('check/music', {
          id: row.id
        })
          .then((res) => {
            if (res.status === 200) {
              this.$store.commit('addDefaultList', [row])
              this.id = row.id
            }
          })
          .catch((err) => {
            console.log(err)
            this.$message('亲爱的,暂无版权')
          })
        // 把点击播放的列表添加到默认列表中
      }
    },
    // 点击列表播放该音乐
    playCellMusic (row) {
      // 把当前点击的存储到vuex中，表示当前正在播放
      // 擅长捉弄同学的高木同学片尾曲
      // 检查当前音乐是否可用
      console.log(row)
      this.$axios.get('check/music', {
        id: row.id
      })
        .then((res) => {
          // console.log(res)
          if (res.status === 200) {
            this.$store.commit('setAtPresentPlayMusic', row)
            if (this.id !== row.id) {
              this.$store.commit('addDefaultList', [row])
              this.$bus.$emit('setPlayIndex', this.defaultList.length - 1)
              this.id = row.id
            }
          }
        })
        .catch((err) => {
          console.log(err)
          this.$message('亲爱的,暂无版权')
        })
    },
    handleClick () {},
    CurrentChange (val) {
      this.currentPage = val
    },
    getSongData (type) {
      this.loadingSong = true
      this.$axios.get('top/song', {type: type})
        .then((res) => {
          if (res.data.code === 200) {
            const result = res.data.data.map((item) => {
              return {
                id: item.id,
                time: item.duration / 1000,
                name: item.album.name
              }
            })
            this.currentPage = 1
            this.newAllSongData = result
            this.loadingSong = false
            // console.log(res.data.data)
          }
        })
    },
    getAlbumData () {
      this.loadingAlbum = true
      this.$axios.get('/top/playlist', {limit: 4, order: 'new', cat: '华语'})
        .then((res) => {
          // console.log(res)
          if (res.data.code === 200) {
            const result = res.data.playlists.map((item) => {
              return {
                img: item.coverImgUrl,
                playCount: item.playCount,
                name: item.name,
                user: item.creator.nickname
              }
            })
            this.albumData = result
            this.loadingAlbum = false
            // console.log(result)
          }
        })
    },
    getSingerData () {
      this.loadingSinger = true
      this.$axios.get('/top/artists', {offset: 0, limit: 8})
        .then((res) => {
          if (res.data.code === 200) {
            const result = res.data.artists
            this.singerList = result
            this.loadingSinger = false
            // console.log(result)
          }
        })
    }
  },
  mounted () {
    this.getSongData(0)
    this.getAlbumData()
    this.getSingerData()
    this.getTopList(0)
  }
}
</script>

<style scoped lang="scss">
  .MusicLibrary{
    .content{
      .recommend{
        /*margin: 0 auto;*/
        /*width: 700px;*/
        overflow-y: auto;
        padding: 0 2px;
        .text{
          /*line-height: 40px;*/
          font-size: 18px;
          color: #000;
          font-weight: bolder;
          padding: 0 10px 0 10px;
          position: relative;
          &:before{
            content: '';
            height: 100%;
            width: 4px;
            border-radius: 2px;
            position: absolute;
            top: 0;
            left: 0;
            background: #41B883;
          }
          /*width: 100px;*/
        }
        .section{
          display: flex;
          .text{
            /*line-height: 40px;*/
            font-size: 18px;
            color: #000;
            font-weight: bolder;
            padding: 0 10px 0 6px;
            position: relative;
            &:before{
              content: '';
              height: 100%;
              width: 4px;
              border-radius: 2px;
              position: absolute;
              top: 0;
              left: 0;
              background: #41B883;
            }
            /*width: 100px;*/
          }
          .content-left{
            /*height: 100%;*/
            /*width: 400px;*/
            flex: 1;
            overflow: hidden;
            .left-title{
              /*height: 40px;*/
              display: flex;
              align-items: center;
              border-bottom:1px solid #eee;
            }
            .new-song-list{
              width: 100%;
              height: 250px;
              overflow: hidden;
              .new-item{
                width: 100%;
                height: 40px;
                line-height: 40px;
                padding-left: 12px;
                display: flex;
                justify-content: space-around;
                transition: all .2s;
                position: relative;
                overflow: hidden;
                .name{
                  flex: 1;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }
                .time{
                  /*display: none;*/
                  opacity: 1;
                  transition: opacity .2s;
                  width: 50px;
                  text-align: center;
                }
                .option{
                  position: absolute;
                  top: 0;
                  right: 5px;
                  opacity: 0;
                  transition: opacity .2s;
                  font-size: 18px;
                  /*display: none;*/
                }
                &:hover{
                  background: #eee;
                  .time{
                    opacity: 0;
                  }
                  .option{
                    opacity: 1;
                  }
                }
              }
            }
          }
          .content-right{
            /*height: 100%;*/
            width: 330px;
            .right-title{
              height: 40px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding-right: 10px;
            }
            .new-album-list{
              width: 100%;
              min-height: 50px;
              display: flex;
              flex-wrap: wrap;
              padding-left: 10px;
              .album-item{
                width: 150px;
                text-align: center;
                cursor: pointer;
                .album-img{
                  margin: 0 auto;
                  width: 125px;
                  height: 120px;
                  position: relative;
                  img{
                    width: 100%;
                    height: 100%;
                  }
                  .user{
                    color: #fff;
                    position: absolute;
                    left: 5px;
                    bottom: 5px;
                  }
                  .playCount{
                    color: #fff;
                    position: absolute;
                    top: 5px;
                    right: 5px;
                  }
                  .play{
                    opacity: 0;
                    transition: all .5s;
                    color: #fff;
                    font-size: 30px;
                    position: absolute;
                    right: 0;
                    bottom: 0;
                  }
                  &:hover{
                    .play{
                      opacity: 1;
                    }
                  }
                }
                .album-name{
                  font-size: 12px;
                  line-height: 1.5;
                }
                &.mt{
                  margin-top: 10px;
                }
              }
            }
          }
        }
        .recommend-singer{
          .singer-title{
            background: #eee;
            height: 50px;
            .text{
              height: 100%;
              display: inline-block;
              line-height: 50px;
            }
          }
          .singer-list{
            /*margin-top: 10px;*/
            min-height: 50px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            /*padding: 0 10px;*/
            .singer-item{
              margin: 10px 5px 15px 5px;
              width: 150px;
              text-align: center;
              cursor: pointer;
              .singer-img{
                margin: 0 auto;
                width: 125px;
                height: 120px;
                img{
                  width: 100%;
                  height: 100%;
                }
              }
              .singer-name{
                /*display: inline-block;*/
                /*height: 30px;*/
                /*line-height: 30px;*/
                &:hover{
                  color: #13ce66;
                }
              }
            }
          }
        }
      }
      .toplist-wrap{
        display: flex;
        .toplist-title{
          width: 300px;
          /*position: relative;*/
          border-right: 1px solid #eee;
          .title{
            /*width: 300px;*/
            width: 100%;
            height: 40px;
            line-height: 40px;
            font-size: 18px;
            color: #000;
            font-weight: bolder;
            padding: 0 10px 0 10px;
            position: relative;
            /*top: 0;*/
            /*left: 0;*/
            background: #eee;
            &:before{
              content: '';
              height: 100%;
              width: 4px;
              border-radius: 2px;
              position: absolute;
              top: 0;
              left: 0;
              background: #41B883;
            }
          }
          .list{
            /*padding-top: 40px;*/
            overflow-y: auto;
            .item{
              width: 100%;
              height: 30px;
              line-height: 30px;
              transition: all .2s;
              padding-left: 10px;
              margin: 5px 0;
              &:hover{
                background: #eee;
              }
              &.active{
                background: #eee;
                position: relative;
                &:before{
                  content: '';
                  height: 100%;
                  width: 4px;
                  border-radius: 2px;
                  position: absolute;
                  top: 0;
                  left: 0;
                  background: #41B883;
                }
              }
            }
          }
        }
        .toplist{
          flex: 1;
          padding: 0 5px;
          .title{
            width: 100%;
            min-height: 40px;
            line-height: 1.7;
            text-align: center;
            border-bottom: 1px solid #eee;
            /*position: absolute;*/
          }
          .top-list{
            /*margin-top: -40px;*/
            /*padding-top: 40px;*/
            overflow-y: auto;
            .top-item{
              width: 100%;
              height: 40px;
              line-height: 40px;
              padding-left: 12px;
              display: flex;
              justify-content: space-around;
              transition: all .2s;
              position: relative;
              overflow: hidden;
              .top-number{
                font-size: 16px;
                width: 25px;
                color: #000;
                &.red{
                  font-size: 18px;
                  color: red;
                }
              }
              .name{
                flex: 1;
                max-width: 300px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
              .time{
                /*display: none;*/
                opacity: 1;
                transition: opacity .2s;
                width: 50px;
                text-align: center;
              }
              .option{
                position: absolute;
                top: 0;
                right: 5px;
                opacity: 0;
                transition: opacity .2s;
                font-size: 18px;
                /*display: none;*/
              }
              &:hover{
                background: #eee;
                .time{
                  opacity: 0;
                }
                .option{
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
