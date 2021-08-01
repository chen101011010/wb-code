/**
 * @description user api 路由
 * @author cyq
 */

const router = require('koa-router')();
const { isExist, register, login, deleteCurrentUser, changeInfo } = require('../../controller/user');
const userValidate = require('../../validator/user');
const { genValidator } = require('../../middlewares/validator');
const { isTest } = require('../../utils/env');
const { loginCheck } = require('../../middlewares/loginChecks');

router.prefix('/api/user');

router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body;
  ctx.body = await isExist(userName);
})

router.post('/register', genValidator(userValidate), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body;
  //调用controller 方法 返回
  ctx.body = await register({
    userName,
    passWord: password,
    gender
  })
})

router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body;
  ctx.body = await login(ctx, userName, password);
})

//删除
router.post('/delete', loginCheck, async (ctx, next) => {
  if (isTest) {
    const { userName } = ctx.session.userInfo;
    ctx.body = await deleteCurrentUser(userName);
  }
})

//修改个人信息
router.patch('/changeInfo', loginCheck, genValidator(userValidate) ,async (ctx, next) => {
  const { nickName, city, picture } = ctx.request.body;
  //controller
  ctx.body = await changeInfo(ctx, {nickName, city, picture})

})

module.exports = router;