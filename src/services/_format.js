/**
 * @description 数据格式化
 * @author cyq
 */
const { DEFAULT_PICTURE } = require('../conf/constant');
/**
 * 用户默认头像
 * @param {object} 用户对象 
 * @returns 
 */
function _formatUserPicture(obj) {
  if (obj.picture == null) {
    obj.picture = '/2.jpg'
  }
  return obj;
}

/**
 * 格式化用户信息
 * @param {array | object} list  用户列表或用户对象
 */
function formatUser(list) {
  if (list == null) {
    return list;
  }
  if (Array.isArray(list)) {
    //用户列表
    return list.map(_formatUserPicture)
  }
  return  _formatUserPicture(list);
}

module.exports = {
  formatUser
}