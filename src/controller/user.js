/**
 * @description user controller
 * @author cyq
 */
const { getUserInfo, createUser, deleteUser, updateUser } = require('../services/user');
const { SuccessModel, ErrorModel } = require('../module/ResModule');
const { doCrypto } = require('../utils/cryp');
/**
 * 用户名是否存在
 * @param {string}} userName 用户名 
 */
async function isExist(userName) {
  //业务逻辑处理
  // 调用services获取数据
  //统一返回格式
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    //用户名存在
    return new SuccessModel(userInfo);
    // ({errno: 0, data:...})
  } else {
    //用户名不存在
    return new ErrorModel({
      errno: 100003,
      message: '用户名未存在'
    })
  }
}
/**
 * 
 * @param {string} userName 用户民
 * @param {string} passWord 密码 
 * @param {number} gender 性别
 * @returns 
 */
async function register({ userName, passWord, gender }) {
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    return new ErrorModel({
      errno: 10003,
      message: '用户名已存在'
    })
  }
  try {
    await createUser({
      userName,
      passWord: doCrypto(passWord),
      gender
    })
    return new SuccessModel()
  } catch (e) {
    console.error(e.message, e.stack);
    return new ErrorModel({
      errno: 10002,
      message: '注册失败,请重试'
    })
  }
}
/**
 * 登录功能
 * @param {object} ctx koa2 ctx 
 * @param {string} userName 用户名 
 * @param {string} passWord 密码
 */
async function login(ctx, userName, passWord) {
  //登录成功  ctx.session.userInfo = xxx
  const userInfo = await getUserInfo(userName, doCrypto(passWord));
  if (!userInfo) {
    return new ErrorModel({
      errno: 10004,
      message: '登录失败'
    })
  }
  if (ctx.session.userInfo == null) {
    ctx.session.userInfo = userInfo;
  }
  return new SuccessModel();
}

/**
 * 删除当前用户
 * @param {string}} userName 用户名 
 */
async function deleteCurrentUser (userName) {
  const result = await deleteUser(userName);
  if (result) {
    return new SuccessModel();
  } else {
    return new ErrorModel({
      error: 10010,
      message: '删除用户信息失败'
    });
  }
}

/**
 * 修改用户信息
 * @param {object} ctx koa ctx
 * @param {string} nickName 昵称
 * @param {string} city 城市
 * @param {picture} picture 头像
 */
async function changeInfo(ctx, { nickName, city, picture }) {
  const { userName } = ctx.session.userInfo;
  if (!nickName) {
    nickName = userName;
  }
  //service 
  const result = await updateUser({
    newNickName: nickName,
    newCity: city,
    newPicture: picture
  }, {
    userName
  })

  if (result) {
    Object.assign(ctx.session.userInfo, {
      nickName,
      city,
      picture
    })
    return new SuccessModel()
  } else {
    return new ErrorModel({
      errno: 10008,
      message: '修改信息失败'
    })
  }
}

/**
 * 
 * @param {*} userName 用户名
 * @param {*} passWord 密码
 * @param {*} newPassword 新密码
 * @returns 
 */
async function changePassword(userName, passWord, newPassword) {
  const result = await updateUser({
    newPassWord: doCrypto(newPassword)
  },{
    userName,
    passWord: doCrypto(passWord)
  });
  if (result) {
    return new SuccessModel()
  } else {
    return new ErrorModel({
      errno: 10006,
      message: '修改密码失败'
    })
  }
}
async function logout(ctx) {
  delete ctx.session.userInfo;
  return new SuccessModel();
}
module.exports = {
  isExist,
  register,
  login,
  deleteCurrentUser,
  changeInfo,
  changePassword,
  logout
}

