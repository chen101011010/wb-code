/**
 * @description 用户关注关系
 * @author cyq
 */

const seq = require('../sequelize');
const { INTEGER } = require('../types');

const UserRelation = seq.define('userRelation', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户 id'
    },
    followsId: {
        type: INTEGER,
        allowNull: false,
        comment: '被关注的id'
    }
})

module.exports = UserRelation;