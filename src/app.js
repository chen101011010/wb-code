const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const index = require('./routes/index');
const users = require('./routes/users');
const errorViewRouter = require('./routes/view/error');
const { REDIS_CONF } = require('./conf/db');
const { isProd, isDev } = require('./utils/env');
// error handle,r
onerror(app);

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
// session 配置
app.keys = ['Uisdf_50327'];
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
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes

app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
