
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const state = {
  searchList: []
}
const getters = {
}

const mutations = {
  addData: function (state, data) {
    state.searchList = [...data]
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
