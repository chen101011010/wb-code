
/**
 * @description blog service api
 * @author cyq
 */
const { Blog, User } = require('../db/module/index');
const { formatUser } = require('./_format');
const { timeFormat } = require('../utils/dt');



async function createBlog({ userId, content, image }) {
  const result = await Blog.create({
    userId,
    content,
    image
  })
  return result.dataValues
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

  let blogList = result.rows.map(row => row.dataValues);
  blogList = blogList.map(item => { 
    item.user = item.user.dataValues;
    console.log(item);
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
  getBlogListByUser
}