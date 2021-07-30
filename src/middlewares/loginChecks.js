/**
 * @description 登录验证的中间件
 * @author cyq
 */

const { ErrorModel } = require('../module/ResModule');

/**
 * api登录验证
 * @param {object} ctx ctx 
 * @param {function} next next
 */
async function loginCheck(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    await next();
  }
  ctx.body = new ErrorModel({
    error: 10005,
    message: '您尚未登录'
  })
}

/**
 * 页面登录验证
 * @param {object} ctx ctx
 * @param {function} next next
 */
async function loginRedirect(ctx, next) {
  console.log('gagaga');
  console.log('diaoyong loginRedirect 方法----------------------------------');
  if (ctx.session && ctx.session.userInfo) {
    await next();
  }
  const curUrl = ctx.url;
  ctx.redirect('/login?url=' + encodeURIComponent(curUrl));
}

module.exports = {
  loginCheck,
  loginRedirect
}