<style lang="less" scoped>
    @import "../../../assets/less/config";
    .content {
        top: 64px;
        bottom: 0;
        overflow-x: hidden;
    }

</style>
<template>
    <div>
        <v-header title="收藏的话题" left-icon="chevron_left" @left="$router.go(-1)"></v-header>
        <v-content v-scroll-record>
            <list :list="topicList"></list>
        </v-content>
    </div>
</template>
<script>
    import is from 'is'
    import routeData from 'mixins/route-data'
    import list from '../list'
    import { mapState } from 'vuex'

    export default {
        components: { list },
        mixins: [routeData],
        routeData() {
            return {
                topicList: []
            }
        },
        computed: mapState({
            user: (state) => state.user
        }),
        created() {
            this.getData()
        },
        watch: {
            $route: 'getData'
        },
        methods: {
            getData() {
                if (!this.user.accesstoken) return this.$router.push('/login')
                const { loginname } = this.user
                this.$http.get(`/api/v1/topic_collect/${loginname}`, {}, ({ data }) => {
                    if (is.array(data)) this.topicList = data
                })
            }
        }
    }
</script>
