<template>
  <div class="toplist-wrap wh" >
    <div class="toplist-title h">
      <div class="title">歌手分类</div>
      <ul class="list wh">
        <li class="item" v-for="(item,index) in singer"
            :class="{active:singerValue===item.value}"
            @click="searchSingerByCategory(item.value)"
            :key="index">{{item.label}}</li>
      </ul>
    </div>
    <div class="toplist singerList h" v-loading="loadingSingerList">
      <div class="alphabet w">
        <div class="alphabet-item" v-for="i in alphabet"
             :key="i"
             :class="{active:i===alphabetActive}"
             @click="searchSingerByAlphabet(i)"
        >{{i}}</div>
      </div>
      <ul  class="singerList-wrap wh" v-infinite-scroll="load">
        <li class="singer-item"
            v-for="(item,index) in singers"
            @click="toSingerDetails(item)"
            :key="index">
          <div class="singer-img">
            <img v-lazy="item.img1v1Url" alt="">
            <div class="play">
              <i class="el-icon-video-play"></i>
            </div>
          </div>
          <span class="singer-name">{{item.name}}</span>
        </li>
      </ul >
    </div>
  </div>
</template>

<script>
export default {
  name: 'Singer',
  data () {
    return {
      singer: [
        {
          label: '入驻歌手',
          value: 5001
        },
        {
          label: '华语男歌手',
          value: 1001
        },
        {
          label: '华语女歌手',
          value: 1002
        },
        {
          label: '华语组合 / 乐队',
          value: 1003
        },
        {
          label: '欧美男歌手',
          value: 2001
        },
        {
          label: '欧美女歌手',
          value: 2002
        },
        {
          label: '欧美组合 / 乐队',
          value: 2003
        },
        {
          label: '日本男歌手',
          value: 6001
        },
        {
          label: '日本女歌手',
          value: 6002
        },
        {
          label: '日本组合 / 乐队',
          value: 6003
        },
        {
          label: '韩国男歌手',
          value: 7001
        },
        {
          label: '韩国女歌手',
          value: 7002
        },
        {
          label: '韩国组合 / 乐队',
          value: 7003
        },
        {
          label: '其他男歌手',
          value: 4001
        },
        {
          label: '其他女歌手',
          value: 4002
        },
        {
          label: '其他组合/乐队',
          value: 4003
        }
      ],
      offset: 0,
      singerValue: 5001,
      loadingSingerList: true,
      alphabetActive: '全部',
      alphabet: ['全部', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    }
  },
  computed: {
    singers () {
      return this.$store.state.singers
    }
  },
  watch: {
    singerValue (e) {
      if (e) {
        this.getSingerList()
      }
    }
  },
  methods: {
    load () {
      this.offset = this.offset + 1
      this.getSingerList()
      console.log(this.offset)
    },
    searchSingerByCategory (val) {
      this.$store.commit('delSingersData', [])
      this.alphabetActive = '全部'
      this.singerValue = val
    },
    searchSingerByAlphabet (val) {
      // this.singers = []
      this.$store.commit('delSingersData', [])
      this.alphabetActive = val
      this.getSingerList()
    },
    getSingerList () {
      const singerValue = this.singerValue
      this.loadingSingerList = true
      let alphabet = this.alphabetActive
      if (alphabet === '全部') {
        alphabet = ''
      }
      this.$axios.get('/artist/list', {cat: singerValue, offset: this.offset, initial: alphabet})
        .then((res) => {
          if (res.data.code === 200) {
            // console.log(res.data.artists)
            // this.singers = [...this.singers, ...res.data.artists]
            this.$store.commit('setSingersData', res.data.artists)
            // this.singers = res.data.artists
            this.loadingSingerList = false
          }
        })
    },
    toSingerDetails (singer) {
      this.$router.push({
        name: 'SingerDetails',
        params: {
          singer: singer
        }
      })
    }
  },
  mounted () {
    this.$store.commit('delSingersData', [])
    this.offset = 0
    this.getSingerList()
  }
}
</script>

<style scoped lang="scss">
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
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
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
      &.singerList{
        .alphabet{
          display: flex;
          .alphabet-item{
            white-space: nowrap;
            text-align: center;
            cursor: pointer;
            &:nth-child(1){
              width: 50px;
              margin-right: 5px;
            }
            flex: 1;
            &.active{
              color: #13ce66;
            }
            &:hover{
              color: #13ce66;
            }
          }
        }
        .singerList-wrap{
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          overflow-y: auto;
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
    }
  }
</style>
