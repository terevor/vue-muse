<style lang="less" scoped>
    @import '../../../assets/less/config';
    .reply-box {
        padding: 10px;
        text-align: right;
        background-color: #f9f9f9;
        .field {
            margin-bottom: 0;
        }
    }
</style>
<template>
    <div class="reply-box">
        <mu-text-field class="field" v-model="content" :hint-text="atSomeone ? '@' + atSomeone : '发表你的看法...'" multi-line full-width :rows="rows" :rows-max="rowsMax"/>
        <mu-raised-button :label="btnLabel" secondary @click="submit"/>
    </div>
</template>
<script>
    export default {
        props: {
            replyId: { // 评论id，如果没有则是对主题的评论
                type: String,
                default: ''
            },
            atSomeone: { // @ someone
                type: String,
                default: ''
            },
            rows: {
                type: Number,
                default: 3
            },
            rowsMax: {
                type: Number,
                default: 6
            }
        },
        data() {
            return {
                btnLabel: '回复',
                content: ''
            }
        },
        methods: {
            submit() {
                if (!this.content) return this.$toast.show('请输入回复内容')
                this.btnLabel = '回复中...'
                let {
                    replyId,
                    content,
                    atSomeone
                } = this
                const {
                    vid
                } = this.$route.params
                if (replyId) {
                    content = `[@${atSomeone}](/user/${atSomeone}) ${content}`
                }
                this.$http.post(`/api/v1/topic/${vid}/replies`, {
                    'reply_id': replyId,
                    content
                }, ({
                    success,
                    error_msg
                }) => {
                    this.btnLabel = '回复'
                    if (success) {
                        this.content = ''
                        this.$toast.show('回复成功')
                        this.$emit('success')
                    } else {
                        this.$toast.show(error_msg)
                    }
                }, () => {
                    this.btnLabel = '回复失败'
                })
            }
        }
    }
</script>
