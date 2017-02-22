<style lang="less" scoped>
    @import "../assets/less/config";
    .go-top {
        width: 50px;
        height: 50px;
        background: rgba(0, 0, 0, 0.54);
        position: absolute;
        bottom: 60px;
        right: 30px;
        border-radius: 100%;
        color: #fff;
        text-align: center;
        line-height: 80px;
        z-index: 100;
        cursor: pointer;
        .mu-icon {
            font-size: 40px;
        }
    }
</style>
<template>
    <div class="go-top" @click="goTop" v-show="visible">
		<mu-icon value="arrow_upward"/>
	</div>
</template>
<script>
    import Scroll from 'muse-components/internal/scroll'

    const scrollTop = (el, value) => {
        const hasScrollTop = 'scrollTop' in el
        if (value === undefined) return hasScrollTop ? el.scrollTop : el.pageYOffset
        if (hasScrollTop) {
            el.scrollTop = value
        } else {
            el.scrollTo(el.scrollX, value)
        }
    }

    export default {
        mixins: [Scroll],
        data() {
            return {
                visible: false
            }
        },
        methods: {
            onScroll() {
                this.visible = scrollTop(this.scroller) > 200
            },
            goTop() {
                scrollTop(this.scroller, 0)
            }
        }
    }
</script>
