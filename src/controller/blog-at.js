/**
 * @description  at
 *  @author cyq
 */
const { PAGE_SIZE } = require('../conf/constant');
const { SuccessModel } = require('../module/ResModule');
const { getAtRelationCount, getAtRelationBlogsByUserId, updateAtRelation } = require('../services/atRelation');

async function getAtMeCount(userId) {
    const result = await getAtRelationCount(userId);
    return new SuccessModel({
        count: result
    });
}

async function getAtMeBlogList(userId, pageIndex = 0) {
    const result = await getAtRelationBlogsByUserId(userId, pageIndex, PAGE_SIZE);
    const { blogList, count } = result;
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count
    })
}

async function makeAsRead(userId) {
    try {
        await updateAtRelation({ newIsRead: true }, { userId, isRead: false })
        return new SuccessModel()
    } catch (e) {
        console.error(e);
    }
}
module.exports = {
    getAtMeCount,
    getAtMeBlogList,
    makeAsRead
}