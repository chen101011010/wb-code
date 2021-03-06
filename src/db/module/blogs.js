
/**
 * @description 微博数据模型
 * @author cyq
 */
const seq = require('../sequelize');
const { STRING, TEXT, INTEGER } = require('../types');

const Blog = seq.define('blog', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  content: {
    type: TEXT,
    allowNull: false,
    comment: '微博内容'
  },
  image: {
    type: STRING,
    comment: '图片地址'
  }
})


module.exports = Blog;
