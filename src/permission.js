import NProgress from 'nprogress'
import router from './router'
import store from './store'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

// 重定向白名单
const whiteList = ['/login/user', '/login/admin']

// 前置导航守卫，做路由跳转前检查
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  // 判断LocalStorage中是否存在token
  if (localStorage.getItem('TOKEN')) {
    // 如果已登录，将登录地址跳转到用户主页
    if (to.path === '/login/user') {
      next({ path: '/user/activity' })
      NProgress.done()
    } else {
      // 判断Vuex中是否存在用户信息
      const isSigned = store.getters.token && store.getters.token.length > 0
      if (isSigned) {
        next()
      } else {
        const role = await store.dispatch('user/setUserInfo')
        const accessRoutes = await store.dispatch('permission/generateRoutes', role)
        router.addRoutes(accessRoutes)
        if (to.matched.length === 0) {
          if (role === 'user') {
            next({ path: '/user/activity' })
          } else {
            next({ path: '/admin/user' })
          }
        } else {
          next({
            ...to,
            replace: true
          })
        }
      }
    }
  } else if (whiteList.includes(to.path)) {
    next()
  } else {
    // 重定向到用户登录
    next({ path: '/login/user' })
    NProgress.done()
  }
})

router.afterEach(() => {
  NProgress.done()
})
