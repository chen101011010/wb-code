/**
 * @description 微博 view 路由
 * @author cyq
 */

const router = require('koa-router')();
const { loginRedirect } = require('../../middlewares/loginChecks');
const { getProfileBlogList } = require('../../controller/blog-profile');
const { isExist } = require('../../controller/user');

//首页
router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {})
})

router.get('/profile', loginRedirect, async (ctx, next) => {
  const {userName} = ctx.session.userInfo;
  ctx.redirect('/profile/' + userName);
})
//个人主页
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
  const myUserInfo = ctx.session.userInfo;
  const myUserName = myUserInfo.userName;
  const { userName } = ctx.params;
  console.log(ctx.params);

  let isMe = myUserName === userName;
  let userInfo;
  if (isMe) {
    userInfo = myUserInfo
  } else {
    const existResult = await isExist(userName);
    if (existResult.errno === 0) {
      userInfo = existResult.data
    } else {
      return
    }
  }
  const result = await getProfileBlogList(userName);
  //获取微博第一页数据
  await ctx.render('profile', {
    blogData: result.data,
    userData: {
      userInfo,
      isMe
    }
  })
})
module.exports = router;