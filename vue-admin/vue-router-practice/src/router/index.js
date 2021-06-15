import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 定义路由
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About')
  },
  {
    path: '/user/:id',
    name: 'User',
    component: () => import ('../views/User'),
    meta: {
      title: `User`
    }
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/404')
  }
]

// 创建路由器实例
export default new VueRouter({
  routes
})