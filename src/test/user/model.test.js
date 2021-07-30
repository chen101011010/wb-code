/**
 * @description user model test
 * @author cyq
 */

const { User } = require('../../db/module/index');


test('User 模型的各个属性，符合预期', () => {
    //build 会构建一个内存的 User 实例， 但不会提交到数据中心
    const user = User.build({
        userName: 'zhangsan',
        passWord: 'p123',
        nickName: '在',
        picture: './xxx.png',
        city: '泰安'
    })
    expect(user.userName).toBe('zhangsan');
    expect(user.passWord).toBe('p123');
    expect(user.nickName).toBe('在');
    expect(user.picture).toBe('./xxx.png');
    expect(user.city).toBe('泰安');
})