<template>
  <div class="main wh">
    <div class="main-left h">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="0">
          <span slot="label" class="tabs-icon"><i class="el-icon-headset"></i></span>
            <el-collapse v-model="collapseActive" accordion>
              <el-collapse-item title="默认列表" name="1">
                <div class="list-container">
                  <div class="music-item pr" v-for="(item, index) in musicList" :key="index">
                    <span class="icon"><i class="el-icon-plus"></i></span>
                    <span class="music-mame">{{item.name}}</span>
                    <span class="music-time">{{item.time}}</span>
                    <span class="options pa">
                      <i class="el-icon-star-off"></i>
                      <i class="el-icon-delete"></i>
                      <i class="el-icon-more"></i>
                    </span>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
        </el-tab-pane>
        <el-tab-pane name="1">
          <span slot="label" class="tabs-icon"><i class="el-icon-cloudy"></i></span>
          我的行程
        </el-tab-pane>
        <el-tab-pane name="2">
          <span slot="label" class="tabs-icon"><i class="el-icon-connection"></i></span>
          我的行程
        </el-tab-pane>
        <el-tab-pane name="3">
          <span slot="label" class="tabs-icon"><i class="el-icon-mobile"></i></span>
          我的行程
        </el-tab-pane>
        <el-tab-pane name="4">
          <span slot="label" class="tabs-icon"><i class="el-icon-download"></i></span>
          我的行程
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="main-right h">{{msg}}</div>
  </div>
</template>
<script>

export default {
  props: [],
  components: {
  },

  data () {
    return {
      musicList: [
        {
          name: '海阔天空',
          time: '03:34'
        },
        {
          name: '海阔天空',
          time: '03:34'
        },
        {
          name: '海阔天空',
          time: '03:34'
        },
        {
          name: '海阔天空',
          time: '03:34'
        },
        {
          name: '海阔天空',
          time: '03:34'
        },
        {
          name: '海阔天空',
          time: '03:34'
        },
        {
          name: '海阔天空',
          time: '03:34'
        },
        {
          name: '海阔天空',
          time: '03:34'
        },
        {
          name: '海阔天空',
          time: '03:34'
        },
        {
          name: '海阔天空',
          time: '03:34'
        },
        {
          name: '海阔天空',
          time: '03:34'
        },
        {
          name: '海阔天空',
          time: '03:34'
        },
        {
          name: '海阔天空',
          time: '03:34'
        },
        {
          name: '海阔天空',
          time: '03:34'
        },
        {
          name: '海阔天空',
          time: '03:34'
        },
        {
          name: '海阔天空',
          time: '03:34'
        },
        {
          name: '海阔天空',
          time: '03:34'
        },
        {
          name: '海阔天空',
          time: '03:34'
        },
        {
          name: '海阔天空',
          time: '03:34'
        },
        {
          name: '海阔天空',
          time: '03:34'
        },
        {
          name: '海阔天空',
          time: '03:34'
        },
        {
          name: '海阔天空',
          time: '03:34'
        },
        {
          name: '海阔天空',
          time: '03:34'
        }
      ],
      activeName: '0',
      collapseActive: '',
      msg: 'hello world'
    }
  },

  computed: {
  },

  methods: {
    handleClick () {}
  },

  created () {
    console.log('')
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/styles/common/functions";
  .main{
    display: flex;
    background-color:#fff;
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
          .icon{
            opacity: 0;
            transition: opacity .1s;
          }
          .music-mame{
            line-height: px2vw(40);
            display: inline-block;
            width: 200px;
          }
          .music-time{
            /*display: none;*/
            float: right;
            margin: px2vw(10) px2vw(10) 0 0;
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
      padding-right: px2vw(10);
    }
  }
</style>
