/**
 * @description utils 路由
 * @author cyq
 */

const router = require('koa-router')();
const koaFrom = require('formidable-upload-koa');
const { loginCheck } = require('../../middlewares/loginChecks');
const { saveFile } = require('../../controller/utils');
router.prefix('/api/utils');

router.post('/upload', loginCheck, koaFrom(), async (ctx, next) => {
  const file = ctx.req.files['file'];
 
  const { size, path, name, type } = file;
  //controller
  ctx.body = await saveFile({ size, path, name, type });
})

module.exports = router;