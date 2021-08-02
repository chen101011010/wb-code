const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const path = require('path');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const index = require('./routes/index');
const userViewRouter = require('./routes/view/user');
const userApiRouter = require('./routes/api/user');
const utilsApiRouter = require('./routes/api/utils');
const errorViewRouter = require('./routes/view/error');

const { REDIS_CONF } = require('./conf/db');
const { isProd, isDev } = require('./utils/env');
const { SESSION_SECRTE_KEY } = require('./conf/crypKeys');
// error handle,r
onerror(app);

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
// session 配置
app.keys = [SESSION_SECRTE_KEY];
app.use(session({
  key: 'wb.sid', // cookie name 默认是  koa.sid
  prefix: 'wb:sess:', // redis key的前缀   默认 koa:sess:
  cookie: {
    path: '/', //根目录
    httpOnly: true, //只能 server 来修改 cookie
    maxAge:  60 * 60 * 1000 // ms
  },
  // ttl: 60 * 60 * 1000, //redis 过期时间 默认maxAge 时间一致
  store: redisStore({
    all: REDIS_CONF.host + ':' + REDIS_CONF.port
  }) //存储到redis中
}));

app.use(json())
app.use(logger())
app.use(require('koa-static')(path.join(__dirname, '/public')))
app.use(require('koa-static')(path.join(__dirname, '../uploadFiles')))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// routes

app.use(index.routes(), index.allowedMethods());
app.use(userViewRouter.routes(), userViewRouter.allowedMethods());
app.use(userApiRouter.routes(), userApiRouter.allowedMethods());
app.use(utilsApiRouter.routes(), utilsApiRouter.allowedMethods());
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods());


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
