const router = require('koa-router')()
const { loginRedirect } = require('../middlewares/loginChecks');


router.get('/', loginRedirect, async (ctx, next) => {

})



module.exports = router
