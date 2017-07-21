// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './vuex/index'
import router from './router/index'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import 'nprogress/nprogress.css'
import i18n from './lang/i18n'

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
