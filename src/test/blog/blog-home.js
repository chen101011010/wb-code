/**
 * @description 首页 test 
 * @author cyq
 */

const server = require('../server');
const COOKIE = 'wb.sid.sig=WPMkgZKAVrJrefLYhjE5bVuSPKc'
test('创建一条微博', async () => {
    const content = '单元的是创建的微博' + Date.now();
    const image = '/2.png' + Date.now();

    const res = await (await server.post('/api/blog/create')).setEncoding({
        content,
        image
    }).set('cookie', COOKIE)

    expect(res.body.errno).toBe(0)
})
