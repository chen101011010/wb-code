/**
 * @description user controller
 * @author cyq
 */
const { getUserInfo } = require('../services/user');
const { SuccessModel, ErrorModel } = require('../module/ResModule');
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


module.exports = {
  isExist
}

