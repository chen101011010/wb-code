/**
 * @description 微博 view 路由
 * @author cyq
 */

const router = require('koa-router')();
const { loginRedirect } = require('../../middlewares/loginChecks');
const { getProfileBlogList } = require('../../controller/blog-profile');
const { getSquareBlogList } = require('../../controller/blog-square');
const { isExist } = require('../../controller/user');
const { getFans, getFollowers } = require('../../controller/user-relation');
const { getHomeBlogList } = require('../../controller/blog-home');
const { getAtMeCount } = require('../../controller/blog-at');


//首页
router.get('/', loginRedirect, async (ctx, next) => {
  const userInfo = ctx.session.userInfo;
  const { id: userId } = userInfo;

  const fansResult = await getFans(userId);
  const followResult = await getFollowers(userId);

  const atCountResult = await getAtMeCount(userId);
  const { count: atCount } = atCountResult.data;
  // 获取第一页数据
  const blogs = await getHomeBlogList(userId);
  await ctx.render('index', {
    userData: {
      atCount: atCount,
      userInfo,
      fansData: {
        count: fansResult.data.count,
        list: fansResult.data.userList
      },
      followersData: {
        count: followResult.count,
        list: followResult.list
      }
    },
    blogData: blogs.data
  })
  
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
  const fansResult = await getFans(userInfo.id);
  const { count, userList } = fansResult.data;

  //获取关注人列表
  const follows = await getFollowers(userInfo.id);
  //我是否关注了此人
  const amIFollowed = userList.some(item => {
    return item.userName === myUserName;
  })


  const atCountResult = await getAtMeCount(userInfo.id);
  const { count: atCount } = atCountResult.data;
  //获取微博第一页数据
  await ctx.render('profile', {
    blogData: result.data,
    userData: {
      atCount,
      userInfo,
      isMe,
      amIFollowed,
      fansData: {
        count,
        list: userList
      },
      followersData: follows
    }
  })
})

//广场页
router.get('/square', loginRedirect, async (ctx, next) => {
  const result = await getSquareBlogList(0);
  await ctx.render('square', {
    blogData: result.data
  });
})


module.exports = router;