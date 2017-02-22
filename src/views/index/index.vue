<style lang="less">
    @import "../../assets/less/config";
    .topic-card {
        margin-bottom: 10px;
        user-select: none;
        .card-header {
            padding-bottom: 0;
        }
        .card-text {
            padding-bottom: 10px;
        }
        .tag {
            font-size: 12px;
            color: @main;
        }
        .header-right-icon {
            position: absolute;
            top: 18px;
            right: 15px;
            text-align: right;
            color: lighten(@text, 20%);
            .mu-icon {
                color: @main;
            }
        }
        .topic-title {
            font-weight: bold;
            padding-bottom: 10px;
            border-bottom: 1px solid #edeff2;
        }
        .expand {
            font-size: 12px;
            color: lighten(@text, 30%);
            .expand-item {
                padding-top: 10px;
                .count {
                    margin-left: 5px;
                }
            }
        }
    }
    .tip-all {
        text-align: center;
        padding-bottom: 8px;
        color: @text;
    }
    .scroller {
        margin-bottom: 10px;
        .mu-infinite-scroll-text {
            display: none;
        }
    }
</style>
<template>
    <div>
        <mu-tabs :value="$route.query.tab || ''" @change="handleTabChange">
            <mu-tab value="" title="全部"/>
            <mu-tab value="good" title="精华"/>
            <mu-tab value="share" title="分享"/>
            <mu-tab value="ask" title="问答"/>
            <mu-tab value="job" title="招聘"/>
        </mu-tabs>
        <v-content v-scroll-record ref="scroller">
            <mu-refresh-control :refreshing="refreshing" :trigger="scroller" @refresh="refreshList"/>
            <router-link v-for="item in list" :key="item.id" :to="'/topic/' + item.id">
                <mu-card class="topic-card">
                    <mu-card-header :title="item.author.loginname" :sub-title="item.tab | tabTrans" sub-title-class="tag" class="card-header">
                        <mu-avatar :src="item.author.avatar_url" slot="avatar"/>
                        <span class="header-right-icon" flex="main:center">
                            <mu-icon value="thumb_up" :size="18" v-if="item.good"/>
                            <mu-icon value="publish" :size="18" v-if="item.top"/>
                            <span>{{ item.create_at | formatDate }}</span>
                        </span>
                    </mu-card-header>
                    <mu-card-text class="card-text">
                        <div class="topic-title" v-html="item.title"></div>
                        <div class="expand" flex="box:mean">
                            <div class="expand-item" flex="main:center cross:center">
                                <mu-icon value="visibility" :size="18"/>
                                <span class="count">{{ item.visit_count > 0 ? item.visit_count : '暂无阅读' }}</span>
                            </div>
                            <div class="expand-item" flex="main:center cross:center">
                                <mu-icon value="forum" :size="18"/>
                                <span class="count">{{ item.reply_count > 0 ? item.reply_count : '暂无评论' }}</span>
                            </div>
                            <div class="expand-item" flex="main:center cross:center">
                                <span>评论：{{ item.last_reply_at | formatDate }}</span>
                            </div>
                        </div>
                    </mu-card-text>
                </mu-card>
            </router-link>
            <mu-infinite-scroll class="scroller" :scroller="scroller" :loading="showLoading" @load="pullList"/>
            <div v-if="complete" class="tip-all">没有更多记录了</div>
        </v-content>
        <v-go-top :scroller="scroller"/>
        <v-footer></v-footer>
    </div>
</template>
<script>
    import pullList from 'mixins/pull-list'

    export default {
        data() {
            return {
                scroller: null
            }
        },
        mixins: [pullList],
        mounted() {
            this.scroller = this.$refs.scroller.$el
        },
        computed: {
            showLoading() {
                return !this.refreshing && this.loading && !this.complete
            }
        },
        methods: {
            handleTabChange(val) {
                this.$router.push({
                    path: '/',
                    query: {
                        tab: val
                    }
                })
            },
            _getPullParams() {
                const {
                    page,
                    $route
                } = this
                const {
                    tab = 'all'
                } = $route.query
                return {
                    url: '/api/v1/topics',
                    data: {
                        page,
                        tab
                    }
                }
            }
        }
    }
</script>
