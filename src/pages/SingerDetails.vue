<template>
  <div class="details wh">
    <div class="details-top w">
      <div class="singer-img">
        <img v-lazy="singer.img1v1Url" alt="">
      </div>
      <div class="singer-name">
        {{singer.name}}
      </div>
    </div>
    <div class="details-bottom w">
      <div class="header">
        <el-tabs v-model="activeName"  @tab-click="handleClick">
          <el-tab-pane
            v-for="(item,index) in tabs"
            :label="item.label"
            :key="index"
            :name="index+''"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="main">
        <el-table
          v-loading="loading"
          :data="tableData"
          tooltip-effect="dark"
          class="searchTable"
          style="width: 100%"
          :height="windowH - 265 +'px'"
          :header-cell-style="tableHeaderColor"
          >
          <el-table-column type="selection" width="30"></el-table-column>
          <el-table-column prop="name" label="歌曲名" align="left" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="album" show-overflow-tooltip align="left" label="专辑" width="120">
          </el-table-column>
          <el-table-column prop="time" align="left" label="时长" width="60">
            <template slot-scope="scope">{{scope.row.time|realFormatSecond}}
            </template>
          </el-table-column>
          <el-table-column prop="host" align="left" label="热度" width="50">
          </el-table-column>
          <el-table-column label="操作" align="left" width="100">
            <template slot-scope="scope">
              <div class="option">
                <i class="el-icon-caret-right cursor" @click="playCellMusic(scope.row)"></i>
                <i class="el-icon-plus cursor" @click="addDefaultList(scope.row)"></i>
                <i class="el-icon-download cursor"></i>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :page-size="pageSize"
          :current-page="currentPage"
          @current-change="CurrentChange"
          layout="prev, pager, next"
          :total="singerSongData.length">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SingerDetails',
  data () {
    return {
      singer: {},
      activeName: 0,
      tabs: [
        {
          label: '单曲'
        },
        {
          label: '专辑'
        },
        {
          label: 'MV'
        },
        {
          label: '资料'
        }
      ],
      // pageSize: 5,
      currentPage: 1,
      loading: true,
      id: null,
      singerSongData: []
    }
  },
  computed: {
    pageSize () {
      return Math.floor((this.windowH - 265) / 45)
    },
    tableData () {
      const that = this
      const data = that.singerSongData
      const result = data.slice((that.currentPage - 1) * that.pageSize, that.currentPage * that.pageSize)
      return result
    },
    defaultList () {
      return this.$store.state.defaultList
    },
    windowH () {
      return this.$store.state.windowH
    }
  },
  methods: {
    tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #F5F7FA;'
      }
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
      this.$axios.get('check/music', {
        id: row.id
      })
        .then((res) => {
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
    getSingerSong () {
      this.$axios.get('artists', {id: this.singer.id})
        .then((res) => {
          if (res.data.code === 200) {
            this.loading = false
            const result = res.data.hotSongs
            this.singerSongData = result.map((item) => {
              return {
                id: item.id,
                name: item.name,
                album: item.ar[0].name,
                time: item.dt / 1000,
                host: ''
              }
            })
            console.log(result)
          }
        })
    }
  },
  mounted () {
    this.singer = this.$route.params.singer
    console.log(this.$route.params.singer)
    this.getSingerSong()
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/styles/common/functions";
.details{
  padding: px2vw(10);
  .details-top{
    /*display: flex;*/
    /*width: px2vw(300);*/
    /*margin: 0 auto;*/
    border-bottom: px2vw(1) solid #eee;
    border-top: px2vw(1) solid #eee;
    padding: px2vw(5);
    .singer-img{
      margin: 0 auto;
      width: px2vw(125);
      height: px2vw(120);
      img{
        width: 100%;
        height: 100%;
      }
    }
    .singer-name{
      margin: 0 auto;
      /*padding: px2vw(10) 0;*/
      width: px2vw(125);
      text-align: center;
    }
  }
  .details-bottom{
    .header{
      width: px2vw(400);
    }
  }
}
</style>
