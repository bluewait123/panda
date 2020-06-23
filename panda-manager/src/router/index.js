import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routers'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由拦截
router.beforeEach((to, from, next) => {
  //如果未匹配到路由
  if (to.matched.length ===0) {
    window.document.title = '404'
    from.matched[0].path === '/main' ? next('main_404') : next('error_404')
  }else{
    window.document.title = to.meta.title || to.name
    next()
  }
  
})

export default router