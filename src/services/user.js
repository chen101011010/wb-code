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

/**
 * 创建用户
 * @param {string}} userName 用户名
 * @param {string}} password 密码
 * @param {number}} gender 性别
 * @param {string}} nickName 昵称
 */
async function createUser({ userName, passWord, gender = 3, nickName }) {

  const result = await User.create({
    userName,
    passWord,
    gender,
    nickName: nickName ? nickName : userName
  })
  return result.dataValues;
}

async function deleteUser(userName) {
  const result = await User.destroy({
    where: {
      userName
    }
  })
  return result > 0;
}

/**
 * 
 * @param {objcct} { newPassWord, newCity, newNickName, newPicture } 要更改的用户信息
 * @param {object} { userName, passWord } 要修改的用户
 */
async function updateUser(
  { newPassWord, newCity, newNickName, newPicture },
  { userName, passWord }
) {
  const updateData = {};
  if (newPassWord) {
    updateData.passWord = newPassWord;
  }
  if (newCity) {
    updateData.city = newCity;
  }
  if (newNickName) {
    updateData.nickName = newNickName;
  }
  if (newPicture) {
    updateData.picture = newPicture;
  }

  const whereData = {
    userName
  }
  if (passWord) {
    whereData.passWord = passWord;
  }
  console.log('11111111111111111111111111111');
  console.log(updateData);
  console.log(whereData);
  const result = await User.update(updateData, {
    where: whereData
  })
  console.log(result);
  return result[0] > 0;
  
}
module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser
}