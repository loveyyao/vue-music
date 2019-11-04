
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const state = {
  keywords: '',
  offset: 0,
  searchList: [],
  atPresent: {}, // 存放当前播放歌曲
  defaultList: [], // 默认播放列表
  comment: {}, // 存储歌曲评论
  lyric: {}, // 歌词
  index: 0,
  top: 0
}
const getters = {
}

const mutations = {
  setSearchInfo: function (state, data) {
    state.keywords = data.keywords
    state.offset = data.offset
  },
  // 添加搜索列表数据
  addData: function (state, data) {
    state.searchList = [...state.searchList, ...data]
  },
  delData: function (state, data) {
    state.searchList = data
  },
  // 设置当前播放
  setAtPresentPlayMusic: function (state, data) {
    state.atPresent = data
  },
  // 添加到默认播放列表
  addDefaultList: function (state, data) {
    state.defaultList = [...state.defaultList, ...data]
  },
  delMusic: function (state, index) {
    state.defaultList.splice(index, 1)
  },
  addSongComment: function (state, data) {
    state.comment = data
  },
  setLyric: function (state, data) {
    state.lyric = data
  },
  setLyricIndex: function (state, data) {
    state.index = data.index
    state.top = data.top
  }
}

const actions = {
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
