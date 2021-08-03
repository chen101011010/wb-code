/**
 * @description 时间相关工具函数
 * @author cyq
 */

const { format } = require('date-fns');

function timeFormat(str) {
    return format(new Date(str), 'MM-dd HH:mm');
}

module.exports = {
    timeFormat
}