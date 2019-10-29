<template>
  <div class="search-container">
    <el-tabs v-model="activeName"  @tab-click="handleClick">
      <el-tab-pane label="单曲" name="0">
        <div class="container">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
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
                  <i class="el-icon-caret-right"></i>
                  <i class="el-icon-plus"></i>
                  <i class="el-icon-download"></i>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="1"></el-tab-pane>
      <el-tab-pane label="MV" name="2"></el-tab-pane>
      <el-tab-pane label="专辑" name="3"></el-tab-pane>
      <el-tab-pane label="歌词" name="4"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      activeName: '0'
    }
  },
  computed: {
    tableData () {
      const data = this.$store.state.searchList
      const result = data.map((item) => {
        return {
          name: item.name,
          album: item.artists[0].name,
          time: item.duration,
          host: ''
        }
      })
      return result
    }
  },
  methods: {
    handleClick () {},
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
    width: 100%;
    height: px2vw(510);
    overflow: hidden;
    .container{
      padding-left: px2vw(20);
      padding-right: px2vw(10);
      width: 100%;
      height: px2vw(472);
      overflow-y: auto;
    }
  }
</style>
