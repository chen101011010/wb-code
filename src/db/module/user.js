/**
 * @description 用户数据模型
 * @author cyq
 */

const seq = require('../sequelize');
const { STRING, DECIMAL } = require('../types');
const User = seq.define('user', {
  userName: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '用户名（唯一）'
  },
  passWord: {
    type: STRING,
    allowNull: false,
    comment: '密码'
  },
  nickName: {
    type: STRING,
    allowNull: false,
    comment: '昵称'
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    comment: '1 男， 2 女， 3 保密',
    default: 3
  },
  picture: {
    type: STRING,
    comment: '头像 url'
  },
  city: {
    type: STRING,
    comment: '城市'
  }
});

module.exports = User;