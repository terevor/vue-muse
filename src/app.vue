<style lang="less" scoped>

</style>
<template>
    <router-view></router-view>
</template>
<script>
    export default {
        data() {
            return {}
        },
        mounted() {
            this.appShow()
        },
        methods: {
            appShow() {
                const END_TIME = new Date().getTime()
                const diffTime = END_TIME - PAGE_START_TIME // eslint-disable-line
                const timer = setTimeout(() => {
                    clearTimeout(timer)
                    document.querySelector('.app-loading').className += ' app-loading-hide'
                }, diffTime > 2000 ? 0 : 2000 - diffTime)
            }
        }
    }
</script>
