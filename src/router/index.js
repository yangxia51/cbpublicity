import Vue from 'vue'
import Router from 'vue-router'
const home = () => import('../page/home/home') // 首页
const musical = () => import('../page/musical/musical') // 音乐剧
const music = () => import('../page/music/music') // 音乐
const movie = () => import('../page/movie/movie') // 电影
const teleplay = () => import('../page/teleplay/teleplay') // 电视剧
const errpage = () => import('../page/errpage/errpage') // 错误页面
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/errpage',
    name: 'errpage',
    component: errpage
  },
  // 初始启动
  {
    path: '',
    redirect: '/home'
  },
  {
    name: 'home',
    path: '/home',
    component: home,
    children: [{
      path: '/movie',
      name: 'movie',
      component: movie
    },
    {
      path: '/musical',
      name: 'musical',
      component: musical
    },
    {
      path: '/music',
      name: 'music',
      component: music
    },
    {
      path: '/teleplay',
      name: 'teleplay',
      component: teleplay
    }]
  }]
})
