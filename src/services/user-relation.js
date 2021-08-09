/**
 * @description 用户关系 services
 * @author cyq
 */
const { User, UserRelation } = require('../db/module/index');
const { formatUser } = require('./_format');
const Sequelize = require('sequelize')
/**
 * 获取关注改用户的粉丝 
 * @param {number} followerId 被关注人id
 */
async function getUserByFollower(followerId) {
    const result = await User.findAndCountAll({
        attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: UserRelation,
                where: {
                    followsId: followerId,
                    userId: {
                        [Sequelize.Op.ne]: followerId
                    }
                }
            }
        ]
    })
    // result.count 总数
    // result.rows 查询结果 数组
    let userList = result.rows.map(user => user.dataValues);
    userList = formatUser(userList);
    return {
        count: result.count,
        userList
    }
}

/**
 * 获取关注人列表
 * @param {} userId 
 * @param {*} followId 
 * @returns 
 */
async function getFollowersByUserId(userId) {
    const result = await UserRelation.findAndCountAll({
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['id', 'userName', 'nickName', 'picture', 'city']
            }
        ],
        where: {
            userId,
            followsId: {
                [Sequelize.Op.ne]: userId
            }
        }
    })
    let userList = result.rows.map(row => row.dataValues);
    userList = userList.map(item => formatUser(item.user.dataValues))
    return {
        count: result.count,
        userList
    }
}
/**
 * 添加关注关系
 * @param {int} userId 用户id
 * @param {int} followId 要关注的id
 */

async function addFollower(userId, followId) {
    const result = await UserRelation.create({
        userId,
        followsId: followId
    })
    return result;
}
/**
 * 删除关注关系
 */
async function deleteFollower(userId, followId) {
    const result = await UserRelation.destroy({
        where: {
            userId,
            followsId: followId
        }
    })
    return result;
}

module.exports = {
    getUserByFollower,
    getFollowersByUserId,
    addFollower,
    deleteFollower
    
}