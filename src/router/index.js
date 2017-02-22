import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from 'store'

Vue.use(VueRouter)

const router = new VueRouter({
    routes,
    mode: 'history',
    base: __dirname
})

router.beforeEach(({meta, path}, from, next) => {
    const { auth = true } = meta
    const isLogin = Boolean(store.state.user.accesstoken)
    if (auth && !isLogin && path !== '/login') {
        return next({ path: '/login' })
    }
    next()
})

export default router
