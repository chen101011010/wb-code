/**
 * @description 数据模型入口文件
 * @author cyq
 */
const User = require('./user');
const Blog = require('./blogs');

Blog.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
module.exports = {
  User,
  Blog
}