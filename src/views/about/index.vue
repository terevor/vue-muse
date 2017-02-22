<style lang="less" scoped>
    .content {
        bottom: 0
    }
    .about {
        padding: 10px;
        line-height: 22px;
        dt {
            line-height: 28px;
            font-weight: bold;
        }
    }
</style>
<template>
    <div>
        <v-header title="关于" left-icon="chevron_left" @left="$router.go(-1)"></v-header>
        <v-content class="content">
            <div class="about">
                <dl>
                    <dt>介绍</dt>
                    <dd>
                        项目为cnodejs.org客户端，适配移动端布局，学习vue2过程中的练习产物，感谢cnodejs社区提供的API。
                    </dd>
                    <dt>技术栈</dt>
                    <dd>
                        vue2、vue-router、vuex、axios、muse-ui、flex.css、ES6、webpack、babel。
                    </dd>
                    <dt>源码</dt>
                    <dd>
                        <a href="https://github.com/terevor/vue-muse" target="_blank">https://github.com/terevor/vue-muse</a>
                    </dd>
                </dl>
            </div>
        </v-content>
    </div>
</template>
<script>

</script>
