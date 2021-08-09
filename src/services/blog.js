
/**
 * @description blog service api
 * @author cyq
 */
const { Blog, User, UserRelation } = require('../db/module/index');
const { formatUser, formatContent } = require('./_format');
const { timeFormat } = require('../utils/dt');



async function createBlog({ userId, content, image }) {
  const result = await Blog.create({
    userId,
    content,
    image
  })
  return result.dataValues
}


async function getBlogListByFollowers(userId, pageIndex = 0, pageSize = 10) {
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex,
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture']
      },
      {
        model: UserRelation,
        attributes: ['userId', 'followsId'],
        where: {
          userId
        }
      }
    ]
  })
 
  let blogList = result.rows.map(row => formatContent(row.dataValues));
  blogList = blogList.map(item => {
    item.user.dataValues = formatUser(item.user.dataValues)

    return item
  })
  return {
    count: result.count,
    blogList
  }
}
/**
 * 根据用户获取微博列表
 * @param {object} param 查询参数 
 */
async function getBlogListByUser({ userName, pageIndex = 0, pageSize = 10 }) {
  const userWhereOpts = {};
  if (userName) {
    userWhereOpts.userName = userName;
  }
  const result = await Blog.findAndCountAll({
    limit: pageSize, //限制
    offset: pageSize * pageIndex,
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture'],
        where: userWhereOpts
      }
    ]
  })
  // result.count 总数，跟分页无关
  // result.rows 查询结果 数组

  let blogList = result.rows.map(row => formatContent(row.dataValues));
  blogList = blogList.map(item => { 
    item.user = item.user.dataValues;
    item.user = formatUser(item.user);
    item.createdAtFormat = timeFormat(item.createdAt);
    return item;
  })
  return {
    count: result.count,
    blogList: blogList
  }
}
module.exports = {
  createBlog,
  getBlogListByUser,
  getBlogListByFollowers
}