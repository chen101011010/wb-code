/**
 * @description 广场页 controller
 * @author cyq
*/

/**
 * @description 个人主页 controller
 * @author cyq
 */
const { getSquareCacheList } = require('../cache/blog');
const { PAGE_SIZE } = require('../conf/constant');
const { SuccessModel } = require('../module/ResModule');



async function getSquareBlogList(pageIndex = 0) {
    const result = await getSquareCacheList(pageIndex, PAGE_SIZE)
    const blogList = result.blogList;
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count: result.count,
    });
   
}
module.exports = {
    getSquareBlogList
}