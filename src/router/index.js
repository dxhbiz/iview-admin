import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import Hello from '@/components/Hello'
import Login from '@/views/common/Login'
import Layout from '@/views/layout/Layout'
import Home from '@/views/layout/Home'
import Table from '@/views/nav1/Table'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      hidden: true
    },
    {
      path: '/layout',
      name: 'Layout',
      component: Layout,
      hidden: true
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      hidden: true
    },
    {
      path: '/',
      component: Layout,
      name: '导航一',
      pid: 1,
      children: [
        { path: '/main', pid: 2, ppid: 1, component: Hello, name: '主页', hidden: true },
        { path: '/table', pid: 3, ppid: 1, component: Table, name: 'Table' },
        { path: '/form', pid: 4, ppid: 1, component: Hello, name: 'Form' },
        { path: '/user', pid: 5, ppid: 1, component: Hello, name: '列表' }
      ]
    },
    {
      path: '/',
      component: Layout,
      name: '导航二',
      pid: 21,
      children: [
        { path: '/page4', pid: 22, ppid: 21, component: Hello, name: '页面4' },
        { path: '/page5', pid: 23, ppid: 21, component: Hello, name: '页面5' }
      ]
    },
    {
      path: '/',
      component: Layout,
      name: '',
      leaf: true,
      pid: 41,
      children: [
        { path: '/page6', pid: 42, ppid: 41, component: Hello, name: '导航三' }
      ]
    },
    {
      path: '/',
      component: Layout,
      name: 'Charts',
      pid: 61,
      children: [
        { path: '/echarts', pid: 62, ppid: 61, component: Hello, name: 'echarts' }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
