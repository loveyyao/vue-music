// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
// 引用API文件
import axios from './api/index.js'
// import 'element-ui/lib/theme-chalk/index.css'
import Utils from './utils/VueUtils'
import './assets/styles/common/common.scss'
import './assets/styles/element-reset.scss'
import { realFormatSecond, FormattedNumber } from './filter'
import elTableInfiniteScroll from 'el-table-infinite-scroll'
import VueLazyload from 'vue-lazyload'
import Vant from 'vant'
import 'vant/lib/index.css'
import './assets/styles/vant-reset.scss'

Vue.use(Vant)
Vue.use(elTableInfiniteScroll)
require('./assets/main.css')
Vue.config.productionTip = false
Vue.use(ElementUI, {
  size: 'small'
})
Vue.use(VueLazyload, {
  loading: '../../static/loading.gif'
})
Vue.filter('realFormatSecond', realFormatSecond)
Vue.filter('FormattedNumber', FormattedNumber)
Vue.prototype.$axios = axios
Vue.prototype.$bus = new Vue()
Vue.prototype.$utils = Utils
// 注册一个全局的拖拽指令
Vue.directive('drag', {
  inserted: function (el, cb) {
    el.onclick = function (ev) {
      ev.stopPropagation()
    }
    el.onmousedown = function (ev) {
      var disX = ev.clientX - el.offsetLeft
      var disY = ev.clientY - el.offsetTop
      document.onmousemove = function (ev) {
        var l = ev.clientX - disX
        var t = ev.clientY - disY
        cb && cb.value(el, t, l)
      }
      document.onmouseup = function () {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
})
// 注册全局获取点击相对元素位置
Vue.directive('click', {
  inserted: function (el, cb) {
    el.onclick = function (ev) {
      var disX = ev.clientX - el.getBoundingClientRect().left - 4
      var disY = ev.clientY - el.getBoundingClientRect().top - 5
      // console.log(ev.clientY, el.getBoundingClientRect().top)
      cb && cb.value(el, disX, disY)
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
