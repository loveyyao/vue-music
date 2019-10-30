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
import { realFormatSecond } from './filter'
require('./assets/main.css')
Vue.config.productionTip = false
Vue.use(ElementUI, {
  size: 'small'
})
Vue.filter('realFormatSecond', realFormatSecond)
Vue.prototype.$axios = axios
Vue.prototype.$bus = new Vue()
Vue.prototype.$utils = Utils
// 注册一个全局的拖拽指令
Vue.directive('drag', {
  inserted: function (el, cb) {
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
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
