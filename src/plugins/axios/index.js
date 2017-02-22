import axios from 'axios'
import store from 'store'
import { USER_SIGNOUT } from 'store/user'
import router from 'router'

const addToken = (data = {}) => {
    const { accesstoken } = store.state.user
    if (accesstoken) {
        data.accesstoken = accesstoken
    }
    return data
}

const client = axios.create({
    baseURL: 'https://cnodejs.org',
    timeout: 3000
})

client.interceptors.request.use(
    config => {
        // config.headers = addToken(config.headers)
        if (config.method === 'get') {
            config.params = addToken(config.params)
        } else {
            config.data = addToken(config.data)
        }
        return config
    },
    error => {
        return Promise.reject(error)
    })

client.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    store.dispatch(USER_SIGNOUT)
                    router.replace({
                        path: '/login'
                    })
            }
        }
        return Promise.reject(error)
    })

const http = {
    get(url, data = {}, success = () => {}, error = () => {}) {
        client.get(url, { params: data })
            .then(({ data }) => success(data)) // return response.data
            .catch(({ response }) => error(response)) // return error.response
    },
    post(url, data = {}, success = () => {}, error = () => {}) {
        client.post(url, data)
            .then(({ data }) => success(data)) // return response.data
            .catch(({ response }) => error(response)) // return error.response
    }
}

export default {
    install(vue) {
        if (!vue.$http) {
            vue.$http = http
        }

        vue.mixin({
            created: function() {
                this.$http = vue.$http
            }
        })
    }
}
