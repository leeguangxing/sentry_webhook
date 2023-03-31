const fs = require('fs');
const path = require('path');

/**
 * 映射 d 目录下的目录和文件为对象
 * @param {number} d 目录
 * @return {object} require 引用对象树
 */
const mapDir = (d) => {
  const tree = {};

  const dirs = []; const files = [];
  const currentDirs = fs.readdirSync(d);
  for (let i = 0; i < currentDirs.length; i++) {
    const currentDir = currentDirs[i];
    const isDir = fs.statSync(path.join(d, currentDir)).isDirectory();
    if (isDir) {
      dirs.push(currentDir);
    } else {
      files.push(currentDir);
    }
  }

  // 递归映射目录
  dirs.forEach((dir) => {
    tree[dir] = mapDir(path.join(d, dir));
  });

  // 映射当前目录的文件
  files.forEach((file) => {
    // 判断文件扩展名
    if (path.extname(file) === '.js') {
      // 使用文件目录的最后一部分并去除 .js 分隔符作为属性名称
      tree[path.basename(file, '.js')] = require(path.join(d, file));
    }
  });

  return tree;
};

// 映射当前执行 index.js 的绝对路径下的目录和文件为对象
module.exports = mapDir(path.join(__dirname));
