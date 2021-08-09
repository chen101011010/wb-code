/**
 * @description json schema 验证中间件
 * @author cyq
 */

const { ErrorModel } = require('../module/ResModule');
/**
 * 
 * @param {function} validatorFn 校验函数 
 * @returns 
 */
function genValidator (validatorFn) {
  return async function validator(ctx, next) {
    //校验 userValidate
    const data = ctx.request.body;
    const error =  validatorFn(data);;
    if (error) {
      ctx.body = new ErrorModel({
        errno: 10009,
        message: '数据格式校验失败'
      });
    } else {
      await next();
    }
  }
}

module.exports = {
  genValidator
}