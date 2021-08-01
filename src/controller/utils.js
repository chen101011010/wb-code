
/**
 * @description utils controller
 * @author cyq
 */
const { ErrorModel, SuccessModel } = require('../module/ResModule');
const nodePath = require('path');
const fse = require('fs-extra');
const MAX_SIZE = 1024 * 1024 * 1024; //文件最大体积 1M
const DIST_POLDER_PATH = nodePath.join(__dirname, '../../uploadFiles')
/**
 * 保存上传文件
 * @param {string} name 文件名 
 * @param {string} type 文件类型 
 * @param {string} size 文件大小 
 * @param {string} path 文件路径 
 * @returns 
 */
async function saveFile({ name, type, size, path }) {
  if (size > MAX_SIZE) {
    await fse.remove(path);
    return new ErrorModel({
      errno: 10007,
      message: '文件上传体积过大'
    });
  }
  //移动文件
  const fileName = Date.now() + name ; //防止重名
  const distFilePath = nodePath.join(DIST_POLDER_PATH, fileName);
  await fse.move(path, distFilePath);

  return new SuccessModel({
    url: '/' + fileName
  })

}

module.exports = {
  saveFile
}