/**
 * @description json test
 * @author cyq
 */

const server = require('./server');

test('json 接口 返回数据格式正确', async () => {
    const res = await server.get('/string');
    expect(res.body).toEqual({
        title: 'koa2 string'
    });
})