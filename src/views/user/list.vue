<style lang="less" scoped>
    .topic-card {
        margin-bottom: 10px;
        .card-header {
            padding-bottom: 0;
        }
        .card-title {
            font-weight: bold;
        }
    }
</style>
<template>
    <div>
        <router-link v-for="item in list" :key="item.id" :to="'/topic/' + item.id">
            <mu-card class="topic-card">
                <mu-card-header :title="item.author.loginname" :sub-title="item.last_reply_at | formatDate" class="card-header">
                    <mu-avatar :src="item.author.avatar_url" slot="avatar"/>
                </mu-card-header>
                <mu-card-text v-html="item.title" class="card-title">
                </mu-card-text>
            </mu-card>
        </router-link>
        <v-empty v-if="!list.length"></v-empty>
    </div>
</template>
<script>
    export default {
        props: {
            list: {
                type: Array,
                default: () => []
            }
        }
    }
</script>
