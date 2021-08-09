/**
 * @description user api 路由
 * @author cyq
 */

const router = require('koa-router')();
const { isExist, register, login, deleteCurrentUser, changeInfo, changePassword, logout } = require('../../controller/user');
const userValidate = require('../../validator/user');
const { genValidator } = require('../../middlewares/validator');
const { isTest } = require('../../utils/env');
const { loginCheck } = require('../../middlewares/loginChecks');
const { getFollowers } = require('../../controller/user-relation');

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

//修改用户密码
router.patch('/changePassword', loginCheck, genValidator(userValidate), async (ctx, next) => {
  const { newPassword, password } = ctx.request.body;
  const { userName  } = ctx.session.userInfo;
  console.log(userName, password, newPassword);
  ctx.body = await changePassword(userName, password, newPassword )

})

//退出登录
router.post('/logout', loginCheck, async (ctx, next) => {
  //controller
  ctx.body = logout(ctx);
})

router.get('/getAtList', loginCheck, async (ctx, next) => {
  const { id: userId } = ctx.session.userInfo;
  const result = await getFollowers(userId);
  let { list } = result;
  list = list.map(user => {
    return `${user.nickName} - ${user.userName}`
  })
  ctx.body = list;
})
module.exports = router;