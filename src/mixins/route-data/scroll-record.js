import RouterStore from './store'

const store = new RouterStore()

const scrollTop = (el, value) => {
    const hasScrollTop = 'scrollTop' in el
    if (value === undefined) return hasScrollTop ? el.scrollTop : el.pageYOffset
    if (hasScrollTop) {
        el.scrollTop = value
    } else {
        el.scrollTo(el.scrollX, value)
    }
}

// const throttle = (action, delay) => { // 节流
//     let last = 0
//     return function() {
//         const curr = +new Date()
//         if (curr - last > delay) {
//             action.apply(this, arguments)
//             last = curr
//         }
//     }
// }

const debounce = (action, delay) => { // 防抖
    let timer = null
    return function() {
        let [context, args] = [this, arguments]
        clearTimeout(timer)
        timer = setTimeout(function() {
            action.apply(context, args)
        }, delay)
    }
}

const scroll = debounce(function(event) { // 监听滚动条改变事件
    const { target: { __url } } = event
    if (__url) {
        const top = scrollTop(event.target)
        store.setItem(__url, top)
    }
}, 1000)

export const scrollRecord = {
    inserted(el, binding, vnode) {
        const init = (to) => {
            const __url = el.__url = store.getUrl(to) // 保存当前关联的url
            el.addEventListener('scroll', scroll, false) // 绑定滚动事件
            const top = store.getItem(__url)
            if (top) {
                scrollTop(el, top)
            }
        }
        init(vnode.context.$route) // DOM渲染完成后重新初始化
        vnode.context.$watch('$route', init) // 路由更改后，重新初始化
    },
    unbind(el, binding, vnode) {
        el.removeEventListener('scroll', scroll, false) // 解除滚动事件绑定
    }
}
