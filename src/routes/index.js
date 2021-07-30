const router = require('koa-router')()
const { loginRedirect } = require('../middlewares/loginChecks');
router.get('/', loginRedirect, async (ctx, next) => {
  
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  const session = ctx.session;
  if (session.viewNum == null) {
    session.viewNum = 0;
  }
  session.viewNum++;
  ctx.body = {
    title: 'koa2 json',
    viewNum: session.viewNum
  }
})

router.get('/profile/:username', async (ctx, next) => {
  const { username } = ctx.params;
  ctx.body = {
    title: '获取username',
    username
  }
})
router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body;
  ctx.body = {
    username,
    password
  }
})

module.exports = router
