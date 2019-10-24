// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import store from './store'
import { Notification } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Utils from './utils/VueUtils'
import './assets/styles/common/common.scss'
require('./assets/main.css')

Vue.config.productionTip = false
Vue.prototype.$notify = Notification
Vue.use(VueResource)

Vue.use(Utils)

Vue.http.interceptors.push(function (request, next) {
  // 跨域携带cookie
  request.credentials = true
  // request.url += '&v=' + Math.Random()
  request.params = {
    'v': Math.random()
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
