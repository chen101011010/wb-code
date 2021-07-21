/**
 * @description test demo
 * @author cyq
 */
function sum(a, b) {
    return a + b
}
test('test 10 + 20 应该等于 30', () => {
    const res = sum(10, 20);
    expect(res).not.toBe(40);
})

