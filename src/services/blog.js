
/**
 * @description blog service api
 * @author cyq
 */
const Blog = require('../db/module/blogs');



async function createBlog({ userId, content, image }) {
  const result = await Blog.create({
    userId,
    content,
    image
  })
  return result.dataValues
}

module.exports = {
  createBlog
}