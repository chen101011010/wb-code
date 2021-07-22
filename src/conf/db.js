/**
 * @description 存储配置
 * @author cyq
 */

const REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
}

const MYSQL_CONF = {
  dialect: 'mysql',
  user: 'root',
  password: 'root',
  port: 3306,
  host: '127.0.0.1',
  databases: 'wb'
}
module.exports = {
  REDIS_CONF,
  MYSQL_CONF
}

