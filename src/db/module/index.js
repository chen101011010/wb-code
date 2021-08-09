/**
 * @description 数据模型入口文件
 * @author cyq
 */
const User = require('./user');
const Blog = require('./blogs');
const UserRelation = require('./userRelation');
const AtRelation = require('./atRelation');

Blog.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

UserRelation.belongsTo(User, {
  foreignKey: 'followsId'
})

User.hasMany(UserRelation, {
  foreignKey: 'userId'
})

Blog.belongsTo(UserRelation, {
  foreignKey: 'userId',
  targetKey: 'followsId'
})
Blog.hasMany(AtRelation, {
  foreignKey: 'blogId'
})

module.exports = {
  User,
  Blog,
  UserRelation,
  AtRelation
}