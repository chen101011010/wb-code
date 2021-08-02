/**
 * @description 首页 controller
 * @author cyq
 */
const { SuccessModel, ErrorModel } = require('../module/ResModule');
const { createBlog } = require('../services/blog');
const xss = require('xss');

async function create({userId, content, image}) {
  try {
    const blog = await createBlog({
      userId,
      content: xss(content),
      image
    })
    return new SuccessModel(blog)
  } catch (e) {
    console.log(e.message, e.stack);
    return new ErrorModel({
      errno: 11001,
      message: '创建微博失败'
    })
  }
}

module.exports = {
  create
}