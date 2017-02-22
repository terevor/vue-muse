// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import router from 'router'
import store from 'store'
import * as filters from './filters'
import { axios, toast } from './plugins'
import { scrollRecord } from 'mixins/route-data'
import components from 'components' // 加载公共组件

import 'normalize.css'
import 'flex.css'
import 'github-markdown-css'
import 'assets/css/common.css'
import 'assets/less/common.less'

import 'muse-components/styles/base.less' // 加载muse-ui基础的样式
import museUIComponents from './components/museui/' // 按需加载muse-ui组件
import 'muse-ui/dist/theme-carbon.css' // 使用 carbon 主题

Vue.use(axios) // 加载http插件
Vue.use(toast) // 加载toast插件

Object.keys(components).forEach((key) => { // 注册公共组件
    const name = key.replace(/(\w)/, (v) => v.toUpperCase()) // 首字母大写
    Vue.component(`v${name}`, components[key])
})

Object.keys(museUIComponents).forEach((key) => { // 注册muse-ui组件
    const c = museUIComponents[key]
    Vue.component(c.name, c)
})

Object.keys(filters).forEach(k => Vue.filter(k, filters[k])) // 注册过滤器

Vue.directive('scroll-record', scrollRecord)

/* eslint-disable no-new */
new Vue({ store, router }).$mount('#app')
