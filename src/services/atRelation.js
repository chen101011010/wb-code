/**
 * @description at关系 service
 * @author cyq
 */
const { Blog, AtRelation, User } = require('../db/module/index');
const { SuccessModel } = require('../module/ResModule');
const { formatContent, formatUser } = require('./_format');
/**
 * 创建微博at用户的关系
 * @param {int} blogId 微博id
 * @param {int} userId 用户id
 */
async function createAtRelation(blogId, userId) {
    const result = await AtRelation.create({
        blogId,
        userId
    })
    return result;
}

async function getAtRelationCount(userId) {
    const result = await AtRelation.findAndCountAll({
        where: {
            userId,
            isRead: false
        }
    })
    return result.count;
}

async function getAtRelationBlogsByUserId(userId, pageIndex, pageSize) {
    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageSize * pageIndex,
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: AtRelation,
                attributes: ['userId', 'blogId'],
                where: {
                    userId
                }
            },
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture']
            }
        ]
    });
    let blogList = result.rows.map(blog => formatContent(blog.dataValues));
    blogList = blogList.map(item => {
        item.user = formatUser(item.user.dataValues);
        return item
    })
    return {
        count: result.count,
        blogList
    }
}

async function updateAtRelation({newIsRead},{userId, isRead}) {
    
    const updateData = {}
    if (newIsRead) {
        updateData.isRead = newIsRead
    }
    const whereData = {}
    if (userId) {
        whereData.userId = userId
    }
    if (isRead) {
        whereData.isRead = isRead
    }

    const result = await AtRelation.update(updateData, {
        where: whereData
    });
    return result[0] > 0
}

module.exports = {
    createAtRelation,
    getAtRelationCount,
    getAtRelationBlogsByUserId,
    updateAtRelation
}