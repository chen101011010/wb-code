/**
 * @description 封装sequelize数据类型
 * @author cyq
 */

const { DataTypes } = require('sequelize');

module.exports = {
  STRING: DataTypes.STRING,
  DECIMAL: DataTypes.DECIMAL,
  TEXT: DataTypes.TEXT,
  INTEGER: DataTypes.INTEGER,
  BOOLEAN: DataTypes.BOOLEAN
}