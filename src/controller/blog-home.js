/**
 * @description 首页 controller
 * @author cyq
 */
const { SuccessModel, ErrorModel } = require('../module/ResModule');
const { createBlog, getBlogListByFollowers } = require('../services/blog');
const xss = require('xss');
const { PAGE_SIZE } = require('../conf/constant');
const { REG_FOR_AT_WHO } = require('../conf/constant');
const { getUserInfo } = require('../services/user');
const { createAtRelation } = require('../services/atRelation')

async function create({ userId, content, image }) {
  //分析并收集content中@用户
  // @userName - nickName
  const atUserNameList = [];
  content = content.replace(REG_FOR_AT_WHO, (str, userName, nickName) => {
    atUserNameList.push(userName);
    return str;
  })
  
  const atUserInfoList = await Promise.all(
    atUserNameList.map( userName => getUserInfo(userName))
  )
  
  const atUserIdList = atUserInfoList.map(user => user.id);
  //创建@关系
  
  try {
    const blog = await createBlog({
      userId,
      content: xss(content),
      image
    })

    const blogId = blog.id;
    //service
    await Promise.all(
      atUserIdList.map(userId => createAtRelation(blogId, userId))
    )

    //返回
    return new SuccessModel(blog)
  } catch (e) {
    return new ErrorModel({
      errno: 11001,
      message: '创建微博失败'
    })
  }
}

/**
 * 获取首页微博列表
 * @param {} userId 
 * @param {*} pageIndex 
 */
async function getHomeBlogList(userId, pageIndex = 0) {
  const result = await getBlogListByFollowers(userId, pageIndex, PAGE_SIZE);
  const { count, blogList } = result;
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count
  });
}

module.exports = {
  create,
  getHomeBlogList,
  getBlogListByFollowers
}