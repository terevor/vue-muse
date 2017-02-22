<style lang="less" scoped>
    @import "../assets/less/config";
    .footer {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 50;
        height: 49px;
        text-align: center;
        .badge {
            position: absolute;
            top: -5px;
            left: 50%;
        }
    }
</style>
<template>
    <mu-paper class="footer">
        <mu-bottom-nav :value="$route.path" shift @change="handleChange">
            <mu-bottom-nav-item value="/" title="首页" icon="home" />
            <mu-bottom-nav-item value="/topic/create" title="发表" icon="send" />
            <mu-bottom-nav-item value="/my/messages" title="消息" icon="email">
                <mu-badge v-if="count > 0" :content="badgeContent" class="badge" circle secondary>
                </mu-badge>
            </mu-bottom-nav-item>
            <mu-bottom-nav-item value="/my/home" title="我的" icon="person" />
        </mu-bottom-nav>
    </mu-paper>
</template>
<script>
    import {
        mapState
    } from 'vuex'

    export default {
        computed: {
            badgeContent() {
                return '' + this.count
            },
            ...mapState({
                user: (state) => state.user
            })
        },
        data() {
            return {
                count: 0
            }
        },
        created() {
            this.getCount()
        },
        methods: {
            getCount() {
                if (!this.user.id) return
                this.$http.get('/api/v1/message/count', {}, (res) => {
                    this.count = res.data
                })
            },
            handleChange(val) {
                this.$router.push({
                    path: val
                })
            }
        }
    }
</script>
