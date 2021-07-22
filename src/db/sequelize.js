const Sequelize = require('sequelize');
const { MYSQL_CONF } = require('../conf/db');
const { isProd, isTest } = require('../utils/env');

const { databases, user, password, host } = MYSQL_CONF;
const config = {
  host: host,
  dialect: 'mysql'
}
//线上环境使用连接池
if (isProd) {
  config.pool = {
    max: 5,
    min: 0,
    idle: 10000
  }
}
if (isTest) { //测试时 不打印sql语句
  config.logging = () => {}
}
const seq = new Sequelize(databases, user, password, config);

module.exports = seq;