<template>
  <div class="recommend wh">
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
          <span class="text">歌单推荐</span>
          <span>更多</span>
        </div>
        <div class="new-album-list" v-loading="loadingAlbum">
          <div class="album-item"
               v-for="(item,index) in albumData"
               :key="index"
               @click="toSongDetails(item)"
               :class="{mt:index>1}">
            <div class="album-img">
              <div class="mask"></div>
              <img v-lazy="item.img" alt="">
              <div class="user">
                <i class="el-icon-user"></i>
                <span>{{item.user}}</span>
              </div>
              <div class="playCount">
                <i class="el-icon-headset"></i>
                <span>{{item.playCount|FormattedNumber}}</span>
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
        <div class="singer-item"
             v-for="(item,index) in singerList"
             @click="toSingerDetails(item)"
             :key="index">
          <div class="singer-img">
            <div class="mask"></div>
            <img v-lazy="item.img1v1Url" alt="">
            <div class="play">
              <i class="el-icon-video-play"></i>
            </div>
          </div>
          <span class="singer-name">{{item.name}}</span>
        </div>
      </div>
    </div>
    <div class="recommend-MV">
      <div class="MV-title w">
        <span class="text">推荐MV</span>
      </div>
      <div class="MV-list w">
        <div class="MV-item" v-for="(item,index) in MVData" :key="index">
          <div class="MV-img">
            <img v-lazy="item.picUrl" alt="">
            <div class="playCount">
              <i class="el-icon-headset"></i>
              <span>{{item.playCount|FormattedNumber}}</span>
            </div>
            <div class="time">{{item.duration|realFormatSecond}}</div>
            <div class="play">
              <i class="el-icon-video-play"></i>
            </div>
          </div>
          <div class="MV-copywriter">{{item.copywriter}}</div>
          <div class="MV-name">{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Recommend',
  data () {
    return {
      loadingSong: true,
      loadingAlbum: true,
      loadingSinger: true,
      newSongType: '0',
      currentPage: 1,
      pageSize: 6,
      MVData: [],
      singerList: [],
      albumData: [],
      newAllSongData: [],
      id: null
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
    toSingerDetails (singer) {
      this.$router.push({
        name: 'SingerDetails',
        params: {
          singer: singer
        }
      })
    },
    toSongDetails (song) {
      this.$router.push({
        name: 'SongDetails',
        params: {
          song: song
        }
      })
    },
    handleClick () {},
    CurrentChange (val) {
      this.currentPage = val
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
          console.log(res)
          if (res.data.code === 200) {
            const result = res.data.playlists.map((item) => {
              return {
                img: item.coverImgUrl,
                playCount: item.playCount,
                name: item.name,
                user: item.creator.nickname,
                id: item.id
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
      this.$axios.get('/top/artists', {offset: 0, limit: 12})
        .then((res) => {
          if (res.data.code === 200) {
            const result = res.data.artists
            this.singerList = result
            this.loadingSinger = false
            // console.log(result)
          }
        })
    },
    getMVData () {
      this.$axios.get('/personalized/mv')
        .then((res) => {
          if (res.data.code === 200) {
            const result = res.data.result
            this.MVData = result.map((item) => {
              return {
                copywriter: item.copywriter,
                duration: item.duration / 1000,
                name: item.name,
                picUrl: item.picUrl,
                playCount: item.playCount,
                id: item.id
              }
            })
            console.log(this.MVData)
          }
          console.log(res)
        })
    }
  },
  mounted () {
    this.getAlbumData()
    this.getSongData()
    this.getSingerData()
    this.getMVData()
  },
  computed: {
    defaultList () {
      return this.$store.state.PC.defaultList
    },
    newSongData () {
      const that = this
      const data = that.newAllSongData
      const result = data.slice((that.currentPage - 1) * that.pageSize, that.currentPage * that.pageSize)
      return result
    }
  }
}
</script>

<style scoped lang="scss">
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
              .mask{
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                background: rgba(0,0,0,.4);
                opacity: 0;
                transition: opacity .5s;
              }
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
                .mask{
                  opacity: 1;
                }
                .play{
                  opacity: 1;
                }
              }
            }
            .album-name{
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              font-size: 12px;
              line-height: 2;
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
            position: relative;
            .mask{
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
              background: rgba(0,0,0,.4);
              opacity: 0;
              transition: opacity .5s;
            }
            img{
              width: 100%;
              height: 100%;
            }
            .play{
              opacity: 0;
              color: #fff;
              position: absolute;
              bottom: 5px;
              right: 5px;
              font-size: 22px;
              transition: opacity .5s;
            }
            &:hover{
              .mask{
                opacity: 1;
              }
              .play{
                opacity: 1;
              }
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
    .recommend-MV{
      .MV-title{
        background: #eee;
        height: 50px;
        .text{
          height: 100%;
          display: inline-block;
          line-height: 50px;
        }
      }
      .MV-list{
        display: flex;
        .MV-item{
          margin: 10px 5px 15px 5px;
          width: 25%;
          text-align: center;
          cursor: pointer;
          overflow: hidden;
          .MV-img{
            margin: 0 auto;
            width: 125px;
            height: 120px;
            position: relative;
            img{
              width: 100%;
              height: 100%;
            }
            .playCount{
              color: #fff;
              position: absolute;
              top: 5px;
              right: 10px;
            }
            .time{
              color: #fff;
              position: absolute;
              bottom: 5px;
              left: 10px;
            }
            .play{
              width: 100%;
              height: 100%;
              opacity: 0;
              color: #fff;
              background: rgba(0,0,0,.5);
              position: absolute;
              bottom: 0;
              right: 0;
              font-size: 35px;
              transition: opacity .5s;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            &:hover{
              .play{
                opacity: 1;
              }
            }
          }
          .MV-copywriter{
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .MV-name{
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
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
</style>
