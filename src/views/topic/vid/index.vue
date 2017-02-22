<style lang="less">
    @import '../../../assets/less/config';
    .topic-card {
        margin-bottom: 10px;
        .card-header,
        .card-title-container {
            padding-bottom: 0;
        }
        .author-name {
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
        .collect-icon {
            position: absolute;
            top: 38px;
            right: 15px;
            cursor: pointer;
        }
        .collected {
            .mu-icon {
                color: @main;
            }
        }
        .reply-card {
            border-left: 5px solid @main;
            em {
                font-style: normal;
                color: @main;
            }
            .reply-box-toggle {
                float: right;
            }
        }
        .reply-actions {
            margin-right: 10px;
            color: lighten(@text, 20%);
        }
        .like {
            color: @main;
        }
        .tip-login {
            padding: 20px;
            text-align: center;
        }
    }
</style>
<template>
    <div>
        <v-header title="话题" left-icon="chevron_left" @left="$router.go(-1)"></v-header>
        <v-content style="top: 64px; bottom: 0;" v-scroll-record>
            <v-loading v-if="!id && exist"></v-loading>
            <v-empty v-if="!exist" msg="话题不存在"></v-empty>
            <mu-card v-if="id" class="topic-card">
                <mu-card-header :title="author.loginname" title-class="author-name" :sub-title="createAt" class="card-header">
                    <mu-avatar :src="author.avatar_url" slot="avatar" @click.native="handleUserClick(author.loginname)"/>
                    <span class="header-right-icon" flex="main:center">
                        <mu-icon value="thumb_up" :size="18" v-if="good"/>
                        <mu-icon value="publish" :size="18" v-if="top"/>
                        <span>#楼主</span>
                    </span>
                    <span class="collect-icon" :class="{ 'collected': is_collect }" flex="main:center">
                        <mu-icon :value="is_collect ? 'favorite' : 'favorite_border'" :size="18" @click="collectToggle"/>
                    </span>
                </mu-card-header>
                <mu-card-title :title="title" title-class="topic-title" class="card-title-container"/>
                <mu-card-text class="card-text">
                    <div class="markdown-body" v-html="content"></div>
                </mu-card-text>
            </mu-card>
            <mu-card v-if="id" class="topic-card">
                <mu-card-text class="reply-card">
                    <span>共<em>{{ replies.length }}</em>条回复</span>
                    <reply-box v-if="user.id" @success="getData"></reply-box>
                    <div class="tip-login" v-if="!user.id">
                        发表回复，请先<router-link to="/login">登录</router-link>
                    </div>
                </mu-card-text>
            </mu-card>
            <mu-card v-for="(item, index) in replies" class="topic-card">
                <mu-card-header :title="item.author.loginname" title-class="author-name" :sub-title="item.create_at | formatDate" class="card-header">
                    <mu-avatar :src="item.author.avatar_url" slot="avatar" @click.native="handleUserClick(item.author.loginname)"/>
                    <span class="header-right-icon">
                        <div class="other">
                            <span>#{{ index + 1 }}</span>
                        </div>
                    </span>
                </mu-card-header>
                <mu-card-text class="card-text">
                    <div class="markdown-body" v-html="item.content"></div>
                </mu-card-text>
                <mu-card-actions class="reply-actions" flex="main:right">
                    <mu-icon value="thumb_up" :size="18" v-if="item.author.loginname !== user.loginname" @click="likeToggle(item)" :class="{ like: testLike(item.ups) }"/>
                    <span v-if="item.ups.length">{{ item.ups.length }}</span>
                    <mu-icon value="reply" :size="18" @click="commentToggle(item)"/>
                </mu-card-actions>
                <transition name="fade">
                    <mu-card-text v-if="item.comment">
                        <reply-box :at-someone="item.author.loginname" :reply-id="item.id" @success="getData"></reply-box>
                    </mu-card-text>
                </transition>
            </mu-card>
        </v-content>
    </div>
</template>
<script>
    import Vue from 'vue'
    import {
        mapState
    } from 'vuex'
    import routeData from 'mixins/route-data'
    import replyBox from './reply-box'

    export default {
        mixins: [routeData],
        components: {
            replyBox
        },
        computed: {
            createAt() {
                return '发表于' + Vue.filter('formatDate')(this.create_at)
            },
            ...mapState({
                user: (state) => state.user
            })
        },
        routeData() {
            return {
                exist: true,
                id: '',
                author_id: '',
                tab: 'share',
                content: '',
                title: '',
                last_reply_at: '',
                good: false,
                top: false,
                reply_count: 0,
                visit_count: 0,
                create_at: '',
                author: {},
                replies: [],
                is_collect: false
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            getData() {
                const {
                    vid
                } = this.$route.params
                this.$http.get(`/api/v1/topic/${vid}`, {}, ({
                    data,
                    success
                }) => {
                    if (success) {
                        data.replies.forEach((item) => {
                            item.comment = false
                        })
                        Object.assign(this.$data, data)
                    } else {
                        this.exist = false
                    }
                })
            },
            handleUserClick(username) {
                this.$router.push({
                    path: '/user/' + username
                })
            },
            collectToggle() { // 点击收藏/取消收藏
                const api = this.is_collect ? 'de_collect' : 'collect'
                const tip = this.is_collect ? '取消收藏' : '收藏'
                this.$http.post(`/api/v1/topic_collect/${api}`, {
                    'topic_id': this.id
                }, ({
                    success,
                    error_msg
                }) => {
                    if (success) {
                        this.is_collect = !this.is_collect
                        this.$toast.show(`${tip}成功`)
                    } else {
                        this.$toast.show(error_msg)
                    }
                })
            },
            testLike(ups) { // 验证自己是否已点赞
                return ups.indexOf(this.user.id || '') > -1
            },
            likeToggle({ ups, id }) { // 点赞/取消点赞
                if (!this.user.accesstoken) return this.$router.push('/login')
                const index = ups.indexOf(this.user.id)
                if (index > -1) {
                    ups.splice(index, 1)
                } else {
                    ups.push(this.user.id)
                }
                this.$http.post(`/api/v1/reply/${id}/ups`)
            },
            commentToggle(item) { // 显示隐藏回复框
                if (!this.user.accesstoken) return this.$router.push('/login')
                const {
                    comment
                } = item
                this.replies.forEach((item) => {
                    item.comment = false
                })
                item.comment = !comment
            }
        }
    }
</script>
