/**
 * @description 微博数据格式校验
 * @author cyq
**/
const _validate = require('./validator');

const schema = {
  type: 'object',
  properties: {
    content: {
      type: 'string'
    },
    image: {
      type: 'string',
      maxLength: 255
    }
  }
}
/**
 * 
 * @param {object} data 用户数据 
 * @returns 
 */
function blogValidate(data = {}) {
  return _validate(schema, data);
}

module.exports = {
  blogValidate
};