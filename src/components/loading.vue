<style lang="less" scoped>
    @import "../assets/less/config";
    .loading {
        margin: 20px auto;
        position: relative;
        animation: rotate-forever 1s infinite linear;
        height: 30px;
        width: 30px;
        border: 4px solid @main;
        border-right-color: transparent;
        border-radius: 50%;
    }
    
    @keyframes rotate-forever {
        0% {
            transform: rotate(0deg)
        }
        100% {
            transform: rotate(360deg)
        }
    }
</style>
<template>
    <div>
        <div class="loading"></div>
    </div>
</template>
<script>
    
</script>
