// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './vuex/index'
import router from './router'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import 'nprogress/nprogress.css'
import VueI18n from 'vue-i18n'
import zhLocale from 'iview/src/locale/lang/zh-CN'
import enLocale from 'iview/src/locale/lang/en-US'
import zh from './lang/zh-CN'
import en from './lang/en'

Vue.use(VueI18n)
Vue.config.productionTip = false
Vue.config.lang = 'zh_CN'
const messages = {
  en: Object.assign(en, enLocale),
  zh_CN: Object.assign(zh, zhLocale)
}
const i18n = new VueI18n({
  locale: Vue.config.lang,
  fallbackLocale: 'en',
  messages
})
Vue.use(iview, {
  i18n: key => i18n.vm._t(key)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  store,
  router,
  template: '<App/>',
  components: { App }
})
