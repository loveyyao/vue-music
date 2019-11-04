<template>
  <div class="search-container wh">
    <el-tabs v-model="activeName"  @tab-click="handleClick">
      <el-tab-pane label="单曲" name="0"></el-tab-pane>
      <el-tab-pane label="歌单" name="1"></el-tab-pane>
      <el-tab-pane label="MV" name="2"></el-tab-pane>
      <el-tab-pane label="专辑" name="3"></el-tab-pane>
      <el-tab-pane label="歌词" name="4"></el-tab-pane>
    </el-tabs>
    <div class="container">
      <div v-show="activeName==='0'">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          class="searchTable"
          style="width: 100%"
          height="472px"
          v-el-table-infinite-scroll="loadSong"
          :header-cell-style="tableHeaderColor"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="30"></el-table-column>
          <el-table-column prop="name" label="歌曲名" align="left" show-overflow-tooltip width="300">
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      activeName: '0',
      id: null
    }
  },
  computed: {
    // 搜索列表
    tableData () {
      const data = this.$store.state.searchList
      const result = data.map((item) => {
        return {
          id: item.id,
          name: item.name,
          album: item.artists[0].name,
          time: item.duration / 1000,
          host: '',
          // imgUrl: item.artists[0].img1v1Url
        }
      })
      return result
    },
    defaultList () {
      return this.$store.state.defaultList
    },
    keywords () {
      return this.$store.state.keywords
    },
    offset () {
      return this.$store.state.offset
    }
  },
  methods: {
    loadSong () {
      const that = this
      const {keywords, offset} = that
      that.$axios.get('search', {
        keywords: keywords,
        offset: offset + 1
      })
        .then((res) => {
          if (res.data.code === 200) {
            that.$store.commit('addData', res.data.result.songs)
            console.log(res.data.result.songs)
          }
        })
      that.$store.commit('setSearchInfo', {
        keywords: keywords,
        offset: offset + 1
      })
    },
    handleClick () {},
    // 点击加号添加到默认列表
    addDefaultList (row) {
      if (this.id !== row.id) {
        // 把点击播放的列表添加到默认列表中
        this.$store.commit('addDefaultList', [row])
        this.id = row.id
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
    handleSelectionChange () {},
    // 修改table header的背景色
    tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #F5F7FA;'
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/common/functions";
  .search-container{
    /*flex: 1;*/
    /*width: 100%;*/
    /*height: px2vw(510);*/
    height: 100%;
    /*overflow: hidden;*/
    display: flex;
    flex-direction: column;
    .container{
      padding-left: px2vw(20);
      padding-right: px2vw(10);
      width: 100%;
      height: px2vw(472);
      /*height: 100%;*/
      /*max-height: 852px;*/
      overflow-y: auto;
    }
  }
</style>
