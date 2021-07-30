/**
 * @description user 格式校验
 * @author cyq
 */
const _validate = require('./validator');

const schema = {
  type: 'object',
  properties: {
    userName: {
      type: 'string',
      maxLength: 255,
      minLength: 2
    },
    password: {
      type: 'string',
      maxLength: 255,
      minLength: 3
    },
    nickName: {
      type: 'string',
      maxLength: 255,
      minLength: 2
    },
    city: {
      type: 'string',
      maxLength: 255,
      minLength: 2
    }
  }
}
/**
 * 
 * @param {object} data 用户数据 
 * @returns 
 */
function userValidate(data = {}) {
  return _validate(schema, data);
}

module.exports = userValidate;