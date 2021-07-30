/**
 * @description json schema 校验
 * @author cyq
 */

const Ajv = require('ajv');

const ajv = new Ajv();
/**
 * json schema 校验
 * @param {object}} schema 校验规则
 * @param {object} data 校验数据
 */
function _validate(schema, data = {}) {
  const valid = ajv.validate(schema, data);
  if (!valid) {
    return ajv.errors[0]
  }

}

module.exports = _validate;