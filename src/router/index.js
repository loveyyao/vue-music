import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/Home.vue'
// import LyricWindow from '@/components/LyricWindow.vue'
import routers from './routers'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  // routes: [
  //   {
  //     path: '/',
  //     name: 'Home',
  //     component: Home
  //   },
  //   {
  //     path: '/lyric',
  //     name: 'Lyric',
  //     component: LyricWindow
  //   }
  // ]
  routes: routers
})
