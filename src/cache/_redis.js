/**
 * @description 链接 redis get set
 * @author cyq
 */
const redis = require('redis');
const { REDIS_CONF } = require('../conf/db');

//创建一个客户端

const redisClint = redis.createClient(
    REDIS_CONF.port,
    REDIS_CONF.host
)
redisClint.on('error', err => {
    console.log('redis err', err);
})

/**
 * 
 * @param {string} key key
 * @param {string} value value
 * @param {number} timeout 过期时间,单位s
 */
function set(key, value, timeout = 60 * 60) {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    redisClint.set(key, value);
    redisClint.expire(key, timeout);
}

/**
 * 
 * @param {string} key key 
 * @returns {promise} value 
 */
function get(key) {
    return new Promise((resolve, reject) => {
        redisClint.get(key, (err, val) => {
            if (err) {
                return reject(err);
            }
            if (val == null) {
                return resolve(null);
            }
            try {
                resolve(JSON.parse(val));
            } catch (e) {
                resolve(val);
            }
        })
    })
}

module.exports = {
    get,
    set
}
