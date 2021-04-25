import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }, {
      path: '/sellerpage',
      name: 'sellerpage',
      component: () => import('../views/SellerPage')
    },{
      path: '/trendpage',
      name: 'trendpage',
      component: () => import('../views/TrendPage')
    },{
      path: '/mappage',
      name: 'mappage',
      component: () => import('../views/MapPage')
    }
  ]
})
