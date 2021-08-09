const { getAtMeCount, getAtMeBlogList, makeAsRead } = require('../../controller/blog-at');
const { loginRedirect } = require('../../middlewares/loginChecks');
const router = require('koa-router')();

router.get('/at-Me', loginRedirect, async (ctx, next) => {
    //获取 @ 数量
    const { id: userId } = ctx.session.userInfo;
    const atCountResult = await getAtMeCount(userId);
    const { count: atCount } = atCountResult.data;

    // 获取第一页列表 controller
    const result = await getAtMeBlogList(userId);
    //标记为已读
    await ctx.render('atMe', {
        atCount,
        blogData: result.data
    })
    if (atCount > 0) {
        await makeAsRead(userId);
    }
})

module.exports = router;