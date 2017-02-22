<style lang="less" scoped>
    @import "../../../assets/less/config";
    .topic-card {
        margin-bottom: 10px;
        .card-header {
            padding-bottom: 0;
        }
        .markdown-body {
            padding: 10px 10px 0;
            margin: 10px 0 0;
            background: #eee;
        }
    }
</style>
<template>
    <div>
        <mu-tabs :value="tab" @change="handleTabChange">
            <mu-tab :value="0" title="未读消息"/>
            <mu-tab :value="1" title="已读消息"/>
        </mu-tabs>
        <v-content style="top: 64px;" v-scroll-record>
            <mu-card class="topic-card" v-for="item in list" :key="item.id">
                <router-link :to="'/user/' + item.author.loginname">
                    <mu-card-header :title="item.author.loginname" :sub-title="item.create_at | formatDate" class="card-header">
                        <mu-avatar :src="item.author.avatar_url" slot="avatar"/>
                    </mu-card-header>
                </router-link>
                <mu-card-text>
                    <div v-if="item.type == 'at'">
                        在话题
                        <router-link :to="'/topic/' + item.topic.id">{{ item.topic.title }}</router-link> 中 @了你
                    </div>
                    <div v-if="item.type == 'reply'">
                        回复你了的话题
                        <router-link :to="'/topic/' + item.topic.id">{{ item.topic.title }}</router-link>
                    </div>
                    <div class="markdown-body" v-html="item.reply.content"></div>
                </mu-card-text>
            </mu-card>
            <v-empty v-if="!list.length" msg="暂无消息"></v-empty>
        </v-content>
        <v-footer></v-footer>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import routeData from 'mixins/route-data'

    export default {
        mixins: [routeData],
        computed: mapState({ user: (state) => state.user }),
        routeData() {
            return {
                tab: 0,
                list: [],
                hideList: []
            }
        },
        created() {
            this.getList()
        },
        methods: {
            handleTabChange(val) {
                this.tab = val
                this.switchList()
            },
            switchList() {
                let tmp = this.list
                this.list = this.hideList
                this.hideList = tmp
            },
            getList() {
                const { accesstoken } = this.user
                if (!accesstoken) return false
                this.$http.get('/api/v1/messages', { mdrender: true }, ({ data }) => {
                    this.list = data.hasnot_read_messages
                    this.hideList = data.has_read_messages
                    if (this.tab === 1) {
                        this.switchList()
                    } else {
                        this.$http.post('/api/v1/message/mark_all') // 标记全部为已读
                    }
                })
            }
        }
    }
</script>
