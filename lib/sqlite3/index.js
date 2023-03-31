// https://www.npmjs.com/package/sqlite3
// https://github.com/mapbox/node-sqlite3/wiki

const SqlString = require('sqlstring');
const sqlite3 = require('sqlite3');

let db;
const dbFileName = 'app.db';

// 初始化数据库文件，不存在时自动创建，并且自动打开数据库
const initDB = () => {
  db = new sqlite3.Database(dbFileName);
  return db;
};

// 关闭数据库
const closeDB = () => {
  return new Promise((resolve, reject) => {
    db.close(function(err) {
      if (!err) {
        resolve();
      } else {
        reject(err);
      }
    });
  });
};

// 以事务方式初始化数据表
const runTransaction = (sqls) => {
  return new Promise((resolve, reject) => {
    db.exec(
        [`BEGIN TRANSACTION;`, ...sqls, `COMMIT;`].join(''),
        function(err) {
          if (!err) {
            resolve();
          } else {
            reject(err);
          }
        },
    );
  });
};

// 执行 SQL 语句
const executeSQL = (sql) => {
  // 如果传入数组，则合并成单个 sql 字符串执行
  if (Array.isArray(sql)) {
    sql = sql.join(';');
  }
  return new Promise((resolve, reject) => {
    db.exec(sql, function(err) {
      if (!err) {
        resolve();
      } else {
        reject(err);
      }
    });
  });
};

// 扫描全表
const scanTable = (tableName) => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM ${SqlString.escape(tableName)}`, function(err, res) {
      if (!err) {
        resolve(res);
      } else {
        reject(err);
      }
    });
  });
};

// 执行单个查询 sql
const selectSql = (sql) => {
  return new Promise((resolve, reject) => {
    db.all(sql, function(err, res) {
      if (!err) {
        resolve(res);
      } else {
        reject(err);
      }
    });
  });
};

// 移除数据表
const dropTable = (tableName) => {
  return executeSQL(`DROP TABLE IF EXISTS ${SqlString.escape(tableName)}`);
};

// 清空数据表并重置索引
// doc: https://www.runoob.com/sqlite/sqlite-truncate-table.html
const truncateTable = async (tableName) => {
  return executeSQL([
    `BEGIN TRANSACTION;`,
    `DELETE FROM ${SqlString.escape(tableName)};`,
    `UPDATE sqlite_sequence SET seq = 0 WHERE name = ${SqlString.escape(
        tableName,
    )};`,
    `COMMIT;`,
  ]);
};

const stringToBase64 = (str) => {
  return Buffer.from(str, 'utf8').toString('base64');
};

const base64ToString = (base64) => {
  return Buffer.from(base64, 'base64').toString('utf8');
};

module.exports = {
  db,
  initDB,
  closeDB,
  runTransaction,
  executeSQL,
  scanTable,
  selectSql,
  dropTable,
  truncateTable,
  stringToBase64,
  base64ToString,
};
