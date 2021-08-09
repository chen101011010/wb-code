/**
 * @description 用户关系 controller 
 * @author cyq
 */
const { SuccessModel, ErrorModel } = require('../module/ResModule');
const { getUserByFollower, getFollowersByUserId, addFollower, deleteFollower } = require('../services/user-relation');

/**
 * 根据userID 获取粉丝列表
 * @param {number} userId 
 */
async function getFans(userId) {
    const { count, userList } = await getUserByFollower(userId);
    return new SuccessModel({
        count,
        userList
    })
}
/**
 * 获取关注人列表
 * @param {number}} userId 
 */
async function getFollowers(userId) {
    const { count, userList } = await getFollowersByUserId(userId);
    return {
        count,
        list: userList
    }
}

async function follow(myUserId, curUserId) {
    //service 
    try {
        await addFollower(myUserId, curUserId);
        return new SuccessModel();
    } catch (e) {
        return new ErrorModel({
            errno: 10011,
            message: '添加关注失败'
        })
    }
}

async function unFollow(myUserId, curUserId) {

    await deleteFollower(myUserId, curUserId);
    return new SuccessModel();
}

module.exports = {
    getFans,
    follow,
    unFollow,
    getFollowers
}