/**
 * @description sequelize 同步数据库
 * @author cyq
 */

const seq = require('./sequelize');
const User = require('./module/index');
seq.authenticate()
  .then(() => {
    console.log('ok');
  })
  .catch(() => {
    console.log('err');
  })
seq.sync({
  force: true
}).then(() => {
  console.log('ok');
  process.exit();
})

