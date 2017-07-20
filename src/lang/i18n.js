/**
 * Created by Administrator on 2017/7/20.
 */

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zhLocale from 'iview/src/locale/lang/zh-CN'
import enLocale from 'iview/src/locale/lang/en-US'
import zh from './zh-CN'
import en from './en'

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

Vue.prototype.$locale = {
  change (lang) {
    i18n.locale = lang
  },
  current () {
    return i18n.locale
  }
}

export default i18n
