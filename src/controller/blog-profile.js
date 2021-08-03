/**
 * @description 个人主页 controller
 * @author cyq
 */
const { getBlogListByUser } = require('../services/blog');
const { PAGE_SIZE } = require('../conf/constant');
const { SuccessModel } = require('../module/ResModule');
async function getProfileBlogList(userName, pageIndex = 0) {
  //service
  const result = await getBlogListByUser({
    userName,
    pageIndex,
    pageSize: PAGE_SIZE
  })
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
  getProfileBlogList
}