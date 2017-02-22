/**
 * 格式化时间
 *
 * @param {String} str
 * @returns 格式化后的时间
 */
export const formatDate = (str) => {
    if (!str) return ''
    const date = new Date(str)
    const time = new Date().getTime() - date.getTime() // 现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
    if (time < 0) {
        return ''
    } else if ((time / 1000 < 30)) {
        return '刚刚'
    } else if (time / 1000 < 60) {
        return parseInt((time / 1000)) + '秒前'
    } else if ((time / 60000) < 60) {
        return parseInt((time / 60000)) + '分钟前'
    } else if ((time / 3600000) < 24) {
        return parseInt(time / 3600000) + '小时前'
    } else if ((time / 86400000) < 31) {
        return parseInt(time / 86400000) + '天前'
    } else if ((time / 2592000000) < 12) {
        return parseInt(time / 2592000000) + '个月前'
    } else {
        return parseInt(time / 31536000000) + '年前'
    }
}

const tabs = {
    'share': '分享',
    'job': '招聘',
    'ask': '问答',
    'good': '精华'
}

/**
 * 翻译标签
 *
 * @param {String} tab
 * @returns 返回标签名
 */
export const tabTrans = (tab) => {
    if (!tab) return ''
    return tabs[tab] || ''
}
