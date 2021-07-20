/**
 * @description 环境变量
 * @author cyq
 */

const ENV = process.env.NODE_ENV;

module.exports = {
    isDev: ENV === 'dev',
    isProd: ENV === 'production',
    notDev: !this.isDev,
    notProd: !this.isProd
}