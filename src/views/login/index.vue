<style lang="less" scoped>
    @import "../../assets/less/config";
    .content {
        top: 64px;
        bottom: 0
    }
    
    .form {
        width: 80%;
        padding: 0 10%;
        margin-top: -50px;
    }
</style>
<template>
    <div>
        <v-header title="登录" left-icon="chevron_left" @left="$router.go(-1)"></v-header>
        <v-content flex="main:center cross:center">
            <form class="form">
                <mu-text-field v-model="form.accesstoken" label="Access Token" full-width label-float/>
                <mu-raised-button :label="btnLabel" secondary @click="submit" full-width/>
            </form>
        </v-content>
    </div>
</template>
<script>
    import is from 'is'
    import {
        mapActions
    } from 'vuex'
    import {
        USER_SIGNIN
    } from 'store/user'

    export default {
        data() {
            return {
                form: {
                    accesstoken: ''
                },
                submitting: false // true正在提交， false还没提交
            }
        },
        computed: {
            btnLabel() {
                return this.submitting ? '正在登录中' : '登录'
            }
        },
        methods: {
            ...mapActions([USER_SIGNIN]),
            submit() {
                if (this.submitting) return
                if (!this.form.accesstoken) return this.$toast.show('请输入 Access Token')
                this.submitting = true
                this.$http.post('/api/v1/accesstoken', this.form,
                    (res) => {
                        if (is.object(res)) {
                            if (res.success) {
                                this.$toast.show('登录成功')
                                this.USER_SIGNIN({
                                    avatar_url: res.avatar_url,
                                    id: res.id,
                                    loginname: res.loginname,
                                    accesstoken: this.form.accesstoken
                                })
                                this.$router.go(-1)
                            } else {
                                this.$toast.show(res.error_msg)
                            }
                        } else {
                            this.$toast.show('登录失败')
                        }
                        this.submitting = false
                    }, ({
                        data = {}
                    }) => {
                        if (data.error_msg) this.$toast.show(data.error_msg)
                        this.submitting = false
                    })
            }
        }
    }
</script>
