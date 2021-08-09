/**
 * @description at 关系
 * @author cyq
 */

const seq = require('../sequelize');
const { INTEGER, BOOLEAN } = require('../types');

const UserRelation = seq.define('atRelation', {
    userId: {
        type: INTEGER,
        allowNull: true,
        comment: '用户 id'
    },
    blogId: {
        type: INTEGER,
        allowNull: true,
        comment: '微博id'
    },
    isRead: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: '是否已读'
    }
})

module.exports = UserRelation;