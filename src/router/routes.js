/**
 * Created by Administrator on 2017/7/21.
 */

import i18n from '../lang/i18n'
import Login from '../views/login/Login'
import Layout from '@/views/layout/Layout'
import Platform from '../views/gamesetting/Platform.vue'
import Address from '../views/gamesetting/Address.vue'
import Zone from '../views/gamesetting/Zone.vue'
import Password from '../views/system/Password.vue'
import Member from '../views/system/Member.vue'
import Group from '../views/system/Group.vue'

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
      { path: '/address', pid: 3, ppid: 1, component: Address, name: i18n.t('addressManager') },
      { path: '/zone', pid: 4, ppid: 1, component: Zone, name: i18n.t('zoneManager') }
    ]
  },
  {
    path: '/',
    component: Layout,
    name: '',
    leaf: true,
    pid: 41,
    children: [
      { path: '/password', pid: 42, ppid: 41, component: Password, name: i18n.t('editPassword') }
    ]
  },
  {
    path: '/',
    component: Layout,
    name: i18n.t('systemSetting'),
    pid: 61,
    children: [
      { path: '/member', pid: 62, ppid: 61, component: Member, name: i18n.t('memberManager') },
      { path: '/group', pid: 63, ppid: 61, component: Group, name: i18n.t('groupManager') }
    ]
  }
]

export default routes
