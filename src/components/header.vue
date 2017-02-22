<style lang="less" scoped>
    
</style>
<template>
    <mu-appbar :title="title" class="appbar">
        <mu-icon-button v-if="leftIcon" :icon="leftIcon" slot="left" @click="$emit('left')"/>
        <div v-else style="width: 48px;" slot="left"></div>
        <mu-icon-button v-if="rightIcon" :icon="rightIcon" slot="right" @click="$emit('right')"/>
        <div v-else style="width: 48px;" slot="right"></div>
    </mu-appbar>
</template>
<script>
    export default {
        props: {
            title: {
                type: String,
                default: ''
            },
            leftIcon: {
                type: String,
                default: null
            },
            rightIcon: {
                type: String,
                default: null
            }
        }
    }
</script>
