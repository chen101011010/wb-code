/**
 * @description user api 路由
 * @author cyq
 */

const router = require('koa-router')();

router.prefix('/api/user');


router.post('/register', async (ctx, next) => {


})

router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body;
  // control
  

})

module.exports = router;