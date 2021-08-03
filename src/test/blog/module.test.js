/**
 * @description 微博数据模型单元测试
 * @author cyq
 */

const Blog = require('../../db/module/blogs');


test('微博数据模型各个属性，符合预期', () => {
    const blog = Blog.build({
        userId: 1,
        content: '微博内容',
        image: '/2.png'
    })

    expect(blog.userId).toBe(1)
    expect(blog.content).toBe('微博内容')
    expect(blog.image).toBe('/2.png')
})