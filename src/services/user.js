/**
 * @description user services
 * @author cyq
 */
const { User } = require('../db/module/index');
const { formatUser } = require('./_format');

/**
 * 
 * @param {*} userName 用户名
 * @param {*} passWord 密码
 */
async function getUserInfo(userName, passWord) {
  //查询条件
  const whereOpt = {
    userName
  }
  if (passWord) {
    Object.assign(whereOpt, { passWord });
  }
  const result = await User.findOne({
    attribute: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOpt
  });
  if (result === null) {
    // 为找到
    return result;
  }
  const formatRes = formatUser(result.dataValues);
  return formatRes;
}

module.exports = {
  getUserInfo
}