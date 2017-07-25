/**
 * Created by Administrator on 2017/7/21.
 */

import i18n from '../lang/i18n'
import Hello from '@/components/Hello'
import Login from '../views/login/Login'
import Layout from '@/views/layout/Layout'
import Platform from '../views/gamesetting/Platform.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    name: i18n.t('gameSetting'),
    pid: 1,
    children: [
      { path: '/platform', pid: 2, ppid: 1, component: Platform, name: i18n.t('platformManager') },
      { path: '/address', pid: 3, ppid: 1, component: Hello, name: i18n.t('addressManager') },
      { path: '/zone', pid: 4, ppid: 1, component: Hello, name: i18n.t('zoneManager') }
    ]
  },
  {
    path: '/',
    component: Layout,
    name: i18n.t('nav2'),
    pid: 21,
    children: [
      { path: '/page4', pid: 22, ppid: 21, component: Hello, name: i18n.t('nav2Test1') },
      { path: '/page5', pid: 23, ppid: 21, component: Hello, name: i18n.t('nav2Test2') }
    ]
  },
  {
    path: '/',
    component: Layout,
    name: '',
    leaf: true,
    pid: 41,
    children: [
      { path: '/page6', pid: 42, ppid: 41, component: Hello, name: i18n.t('nav3') }
    ]
  },
  {
    path: '/',
    component: Layout,
    name: i18n.t('nav4'),
    pid: 61,
    children: [
      { path: '/echarts', pid: 62, ppid: 61, component: Hello, name: i18n.t('nav4Test1') }
    ]
  }
]

export default routes
