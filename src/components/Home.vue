<template>
  <div class="main wh">
    <div class="main-left h">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="0">
          <span slot="label" class="tabs-icon"><i class="el-icon-headset"></i></span>
            <el-collapse v-model="collapseActive" accordion>
              <div class="list-container">
                <el-collapse-item :title="'默认列表 '+'[ '+defaultList.length+' ]'" name="1">
                    <div class="music-item pr"
                         v-for="(item, index) in defaultList"
                         @click="playMusic(item,index)"
                         :key="index">
                      <span class="icon"><i class="el-icon-plus"></i></span>
                      <span class="music-mame">{{item.name}}</span>
                      <span class="music-time">{{item.time|realFormatSecond}}</span>
                      <span class="options pa pc">
                        <i class="el-icon-star-off"></i>
                        <i class="el-icon-delete" @click="deleteMusic(index)"></i>
                        <i class="el-icon-more"></i>
                      </span>
                    </div>
                </el-collapse-item>
              </div>
            </el-collapse>
        </el-tab-pane>
        <el-tab-pane name="1">
          <span slot="label" class="tabs-icon"><i class="el-icon-cloudy"></i></span>
          待开发
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
    </div>
    <div class="main-right h">
      <el-tabs v-model="rightActiveName" :stretch="true" @tab-click="handleClick">
        <el-tab-pane label="乐库" name="0">
          待开发（目前只有搜索功能）
        </el-tab-pane>
        <el-tab-pane label="电台" name="1">待开发</el-tab-pane>
        <el-tab-pane label="歌单" name="2">待开发</el-tab-pane>
        <el-tab-pane label="MV" name="3">待开发</el-tab-pane>
        <el-tab-pane label="直播" name="4">待开发</el-tab-pane>
        <el-tab-pane label="KTV" name="5">待开发</el-tab-pane>
        <el-tab-pane label="歌词" name="6">待开发</el-tab-pane>
      </el-tabs>
      <Search v-if="!rightActiveName"></Search>
<!--      <Search/>-->
    </div>
  </div>
</template>
<script>
import Search from './common/Search'
export default {
  props: [],
  components: {
    Search
  },

  data () {
    return {
      rightActiveName: '0',
      activeName: '0',
      collapseActive: '',
      playIndex: null // 当前播放下标
    }
  },

  computed: {
    // 获取默认播放列表
    defaultList () {
      return this.$store.state.defaultList
    }
  },
  watch: {
    defaultList (e) {
      this.$utils.setItem('defaultList', e)
    },
    playIndex (e) {
      this.$store.commit('setAtPresentPlayMusic', this.defaultList[e])
    },
    // 监视rightActiveName的值
    rightActiveName (e) {
      // 当值为六的时候触发更换页面背景
      if (e === '6') {
        this.$bus.$emit('setBg', true)
      } else {
        // 不为6的时候背景切换回来
        this.$bus.$emit('setBg', false)
      }
    }
  },
  methods: {
    handleClick () {},
    playMusic (data, index) {
      if (this.playIndex !== index) {
        this.playIndex = index
        this.$store.commit('setAtPresentPlayMusic', data)
      }
    },
    // 点击删除图标
    deleteMusic (index) {
      this.$store.commit('delMusic', index)
    }
  },
  created () {
    console.log('')
  },
  mounted () {
    const that = this
    // 绑定一个触发搜索列表组件显示的方法
    that.$bus.$on('showSearch', function () {
      that.rightActiveName = ''
    })
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/styles/common/functions";
  .main{
    display: flex;
    /*background-color:#fff;*/
    .main-left{
      width: 30%;
      border-right: 2px solid #eee;
      overflow: hidden;
      /*padding-left: px2vw(10);*/
      .tabs-icon{
        font-size: 20px;
      }
      .list-container{
        width: 100%;
        height: px2vw(463);
        overflow-y: auto;
        .music-item{
          width: 100%;
          height: px2vw(40);
          padding-left: px2vw(5);
          display: flex;
          align-items: center;
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
            background: #eee;
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
    .main-right{
      width: 70%;
      overflow: hidden;
    }
  }
</style>
