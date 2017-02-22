const toast = {
    show(msg = '', time = 1500) {
        const el = document.createElement('div')
        el.className = 'common-toast common-toast-show'
        el.innerHTML = msg
        document.body.appendChild(el)
        el.style.display = 'block'
        el.style.margin = `-${el.offsetHeight / 2}px 0 0 -${el.offsetWidth / 2}px`
        const timer = setTimeout(() => {
            el.className = 'common-toast common-toast-hide'
            clearTimeout(timer)
            const timer2 = setTimeout(() => {
                document.body.removeChild(el)
                clearTimeout(timer2)
            }, 200)
        }, time)
    }
}

export default {
    install(vue) {
        if (!vue.$toast) {
            vue.$toast = toast
        }

        vue.mixin({
            created: function() {
                this.$toast = vue.$toast
            }
        })
    }
}
