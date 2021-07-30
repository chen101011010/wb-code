/**
 * @description user api test
 * @author cyq
 */

const server = require('../server');

const userName = `u_${Date.now()}`;
const passWord = `p_${Date.now()}`;

const testUser = {
    userName,
    passWord,
    nickName: userName,
    gender: 1
};

let COOKIE = '';


test('注册一个用户，应该成功', async () => {
    const res = await server.post('/api/user/register').send(testUser)
    expect(res.body.errno).toBe(0)
})

test('用户重复注册, 应该失败', async () => {
    const res = await server.post('/api/user/register').send(testUser)
    expect(res.body.errno).not.toBe(0)
})

test('查询用户是否存在，应该存在', async () => {
    const res = await server.post('api/user/isExist').send({ userName: testUser.userName})
    expect(res.body.errno).toBe(0)
})

// test('用户格式信息检测', async () => {
//     const res = await server.post('/api/user/register').send(Object.assign(testUser, { passWord: '1' }))
//     expect(res.body.errno).not.toBe(0)
// })

// test('登录，应该成功', async () => {
//     const res = await server.post('/api/user/login').send({
//         userName: testUser.userName,
//         passWord: testUser.passWord
//     })
//     expect(res.body.errno).toBe(0)
//     COOKIE = res.headers['set-cookie'].join(';')
// })

// test('删除用户，应该成功', async () => {
//     const res = await (await server.post('api/user/delete')).set('cookie', COOKIE).send(testUser.userName)
//     expect(res.body.errno).toBe(0)
// })

// test('删除之后,查询用户是否存在，应该存在', async () => {
//     const res = await server.post('api/user/isExist').send(testUser.userName)
//     expect(res.body.errno).not.toBe(0)
// })