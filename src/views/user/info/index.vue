<style lang="less" scoped>
    @import "../../../assets/less/config";
    .user {
        .avatar {
            margin-top: 20px;
        }
        .name {
            margin: 10px;
            font-size: 20px;
            font-weight: 500;
        }
        .score {
            width: 100%;
            font-size: 12px;
            div {
                padding: 10px;
            }
        }
    }
    
    .content {
        top: 64px;
        bottom: 0;
        overflow-x: hidden;
    }

</style>
<template>
    <div>
        <v-header title="个人资料" left-icon="chevron_left" @left="$router.go(-1)"></v-header>
        <v-content v-scroll-record>
            <div class="user" flex="dir:top cross:center">
                <div class="avatar">
                    <mu-avatar :src="data.avatar_url" :size="80"/>
                </div>
                <div class="name">{{ data.loginname }}</div>
                <div class="score" flex="main:justify">
                    <div>积分：{{ data.score }}</div>
                    <div>注册于：{{ data.create_at | formatDate }}</div>
                </div>
            </div>
            <mu-tabs :value="tabIndex" @change="handleTabChange">
                <mu-tab :value="0" title="回复"/>
                <mu-tab :value="1" title="主题"/>
            </mu-tabs>
            <list v-show="tabIndex == 0" :list="data.recent_replies"></list>
            <list v-show="tabIndex == 1" :list="data.recent_topics"></list>
        </v-content>
    </div>
</template>
<script>
    import is from 'is'
    import routeData from 'mixins/route-data'
    import list from '../list'

    export default {
        components: { list },
        mixins: [routeData],
        routeData() {
            return {
                tabIndex: 0,
                data: {}
            }
        },
        created() {
            this.getData()
        },
        watch: {
            $route: 'getData'
        },
        methods: {
            getData() {
                const { username = '' } = this.$route.params
                this.$http.get(`/api/v1/user/${username}`, {}, ({ data }) => {
                    if (is.object(data) && data.loginname) this.data = data
                })
            },
            handleTabChange(val) {
                this.tabIndex = val
            }
        }
    }
</script>
