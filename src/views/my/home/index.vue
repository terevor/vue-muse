<style lang="less" scoped>
    @import "../../../assets/less/config";
    .content {
        background: #eee;
        top: 64px;
    }
    .user-avatar {
        text-align: center;
        margin-top: 30px;
    }
    .user-name {
        padding: 10px 0 20px;
        line-height: 32px;
        text-align: center;
        font-size: 20px;
        font-weight: 500;
    }
    .nav {
        padding: 0;
        margin: 0;
        li {
            list-style: none;
            border-bottom: 1px solid #ddd;
            background-color: #fbfbfb;
            &:first-of-type {
                border-top: 1px solid #ddd;
            }
        }
        a {
            padding: 8px 10px;
            line-height: 28px;
            .icon {
                width: 40px;
            }
            .text {
                line-height: 30px;
                font-size: 14px;
                color: lighten(@text, 20%);
            }
        }
    }
</style>
<template>
    <div>
        <v-header title="个人中心" :right-icon="!user.id ? '' : 'power_settings_new'" @right="$router.push('/signout')"></v-header>
        <v-content v-scroll-record>
            <router-link v-if="user.avatar_url" :to="'/user/' + user.loginname">
                <div class="user-avatar">
                    <mu-avatar :src="user.avatar_url" :size="120"/>
                </div>
                <div class="user-name">{{ user.loginname }}</div>
            </router-link>
            <router-link v-if="!user.avatar_url" to="/login">
                <div class="user-avatar">
                    <mu-avatar icon="person" :size="120" :icon-size="100"/>
                </div>
                <div class="user-name">你还未登录，请先登录！</div>
            </router-link>
            <nav class="nav">
                <li v-for="item in menus">
                    <router-link :to="item.url" flex="box:justify">
                        <div class="icon" flex="main:center cross:center">
                            <mu-icon :value="item.icon" />
                        </div>
                        <div class="text" v-text="item.text"></div>
                        <div class="icon" flex="main:center cross:center">
                            <mu-icon value="chevron_right" />
                        </div>
                    </router-link>
                </li>
            </nav>
        </v-content>
        <v-footer></v-footer>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import routeData from 'mixins/route-data'

    export default {
        mixins: [routeData],
        data() {
            return {
                menus: [
                    {
                        text: '发表主题',
                        url: '/topic/create',
                        icon: 'send'
                    },
                    {
                        text: '我的消息',
                        url: '/my/messages',
                        icon: 'email'
                    },
                    {
                        text: '我的收藏',
                        url: '/collect',
                        icon: 'favorite'
                    },
                    {
                        text: '关于',
                        url: '/about',
                        icon: 'info_outline'
                    }
                ]
            }
        },
        computed: mapState({ user: (state) => state.user }),
        routeData() {
            return {}
        }
    }
</script>
