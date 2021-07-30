/**
 * @description 加密方法
 * @author cyq
 */
const { CRYPTO_SECRTE_KEY } = require('../conf/crypKeys');
const crypto = require('crypto');

//秘钥
const SECRET_KEY = CRYPTO_SECRTE_KEY;


/**
 * md5 加密
 */

function _md5(content) {
  const md5 = crypto.createHash('md5');
  return md5.update(content).digest('hex');
}
/**
 * 加密方法
 * @params {string} content
 */
function doCrypto(content) {
  const str = `password=${content}&key=${SECRET_KEY}`;
  return _md5(str);
}
module.exports = {
  doCrypto
}