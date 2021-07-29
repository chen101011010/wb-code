/**
 * @description user api 路由
 * @author cyq
 */

const router = require('koa-router')();
const { isExist } = require('../../controller/user');

router.prefix('/api/user');


router.post('/register', async (ctx, next) => {


})

router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body;
  ctx.body = await isExist(userName);
  // control
  

})

module.exports = router;