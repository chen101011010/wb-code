/**
 * @description blog 缓存层
 * @author cyq
 */

const { get, set } = require('./_redis');

const { getBlogListByUser } = require('../services/blog');
//redis key 前缀
const KEY_PREFIX = 'wb:square:';

async function getSquareCacheList(pageIndex, pageSize) {
    const key = KEY_PREFIX + pageIndex +'_' + pageSize;
    //尝试获取缓存
    const cacheResult = await get(key);
    if (cacheResult != null) {
        return cacheResult
    }
    const result = await getBlogListByUser({ pageIndex, pageSize});
    set(key, result, 60);
    return result;
}

module.exports = {
    getSquareCacheList
}