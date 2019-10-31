
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const state = {
  searchList: [],
  atPresent: {}, // 存放当前播放歌曲
  defaultList: [], // 默认播放列表
  comment: {} // 存储歌曲评论
}
const getters = {
}

const mutations = {
  // 添加搜索列表数据
  addData: function (state, data) {
    state.searchList = [...data]
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
