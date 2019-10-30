
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const state = {
  searchList: [],
  atPresent: {}, // 存放当前播放歌曲
  defaultList: [] // 默认播放列表
}
const getters = {
}

const mutations = {
  addData: function (state, data) {
    state.searchList = [...data]
  },
  setAtPresentPlayMusic: function (state, data) {
    state.atPresent = data
  },
  addDefaultList: function (state, data) {
    state.defaultList = [...state.defaultList, ...data]
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
