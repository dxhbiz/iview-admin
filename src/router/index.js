import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import utils from '../utils/index'
import routes from './routes'

Vue.use(Router)

const router = new Router({
  routes: routes
})

const whiteRouterList = ['/login']
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (whiteRouterList.indexOf(to.path) >= 0) {
    next()
    return
  }
  if (!utils.user.check()) {
    next({path: '/login'})
    NProgress.done()
    return
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
