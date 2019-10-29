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
Vue.use(Utils)
Vue.prototype.$axios = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
