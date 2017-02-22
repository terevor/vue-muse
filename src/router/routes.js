import App from '../app'
/**
 * auth true登录才能访问，false不需要登录
 */
export default [
    {
        path: '/',
        component: App,
        children: [
            {
                path: '/login', // 登录
                meta: { auth: false },
                component: resolve => require(['../views/login/'], resolve)
            },
            {
                path: '/signout', // 退出
                component: resolve => require(['../views/signout/'], resolve)
            },
            {
                path: '/about', // 关于
                meta: { auth: false },
                component: resolve => require(['../views/about/'], resolve)
            },
            {
                path: '/user/:username', // 查看用户信息
                meta: { auth: false },
                component: resolve => require(['../views/user/info/'], resolve)
            },
            {
                path: '/collect', // 查看我收藏的话题
                meta: { auth: true },
                component: resolve => require(['../views/user/collect/'], resolve)
            },
            {
                path: '/my/home', // 我的个人中心
                meta: { auth: false },
                component: resolve => require(['../views/my/home/'], resolve)
            },
            {
                meta: { auth: true },
                path: '/my/messages', // 我的消息
                component: resolve => require(['../views/my/messages/'], resolve)
            },
            {
                path: '/topic/create', // 创建话题
                meta: { auth: false },
                component: resolve => require(['../views/topic/create/'], resolve)
            },
            {
                meta: { auth: false },
                path: '/topic/:vid', // 查看话题
                component: resolve => require(['../views/topic/vid/'], resolve)
            },
            {
                path: '/', // 首页
                meta: { auth: false },
                component: resolve => require(['../views/index/'], resolve)
            },
            {
                path: '*', // 其他页面
                redirect: '/login'
            }
        ]
    }
]
