
import Vuex from 'vuex'
import Vue from 'vue'
import PCData from './PC'
import mobile from './mobile'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    PC: PCData,
    mobile: mobile
  }
})
