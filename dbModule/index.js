// lib
const SqlString = require('sqlstring');
const {logger} = require('../lib/log4js');
const {
  runTransaction,
  selectSql,
  executeSQL,
  scanTable,
  stringToBase64,
  base64ToString,
} = require('../lib/sqlite3');

// const
const {
  TABLES,
  allSchemes,
  projectTableData,
  dingTalkGroupTableData,
  projectDingTalkGroupTableData,
} = require('./scheme');

/* ==========================================================================
   初始化数据表
   ========================================================================== */
const initTables = async () => {
  try {
    await runTransaction(allSchemes);
  } catch (e) {
    logger.error(e);
  }
};

/* ==========================================================================
   key_value
   ========================================================================== */
const getValue = async (key) => {
  try {
    const res = await selectSql(
        `SELECT value FROM ${TABLES.keyValue} WHERE key = ${SqlString.escape(
            key,
        )}`,
    );
    if (res && res[0] && res[0].value) {
      const resValue = base64ToString(res[0].value);
      try {
        // 尝试返回对象
        const str = resValue.replace(/\\/g, '');
        const obj = JSON.parse(str);
        if (typeof obj === 'number') {
          return String(obj);
        } else {
          return obj;
        }
      } catch (e) {
        return resValue;
      }
    } else {
      return '';
    }
  } catch (e) {
    logger.error(e);
    return null;
  }
};

const deleteKeyValue = async (key) => {
  try {
    await selectSql(
        `DELETE FROM ${TABLES.keyValue} WHERE key = ${SqlString.escape(key)}`,
    );
  } catch (e) {
    logger.error(e);
  }
};

const setValue = async (key, value) => {
  try {
    if (typeof value !== 'string') {
      value = JSON.stringify(value);
    }
    // base64 编码
    value = stringToBase64(value);
    if ((await getValue(key)) === null || (await getValue(key)) === '') {
      // 新增
      await executeSQL(
          `INSERT INTO ${TABLES.keyValue}(key, value) VALUES(${SqlString.escape(
              key,
          )}, ${SqlString.escape(value)})`,
      );
    } else {
      // 更新
      await executeSQL(
          `UPDATE ${TABLES.keyValue} SET value = ${SqlString.escape(
              value,
          )} WHERE key = ${SqlString.escape(key)}`,
      );
    }
  } catch (e) {
    logger.error(e);
  }
};

// 初始化数据
const initData = async () => {
  const project = await scanTable(TABLES.project);
  if (project.length === 0) {
    await executeSQL(projectTableData);
  }
  const dingtalkGroup = await scanTable(TABLES.dingTalkGroup);
  if (dingtalkGroup.length === 0) {
    await executeSQL(dingTalkGroupTableData);
  }
  const projectDingTalkGroup = await scanTable(TABLES.projectDingtalkGroup);
  if (projectDingTalkGroup.length === 0) {
    await executeSQL(projectDingTalkGroupTableData);
  }
};

// 查询
const getProjects = async () => {
  try {
    const res = await scanTable(TABLES.project);
    return res;
  } catch (e) {
    logger.error(e);
  }
};

const getDingtalkGroups = async () => {
  try {
    const res = await scanTable(TABLES.dingTalkGroup);
    return res;
  } catch (e) {
    logger.error(e);
  }
};

// 新增记录
const addProject = async ({projectName, repositoryUrl = '', remark = ''}) => {
  try {
    await executeSQL(`INSERT INTO ${TABLES.project}(
      project_name, 
      repository_url,
      remark
    ) VALUES(
      ${SqlString.escape(projectName)},
      ${SqlString.escape(repositoryUrl)},
      ${SqlString.escape(remark)}
    )`);
  } catch (e) {
    logger.error(e);
  }
};

// 删除记录
const deleteProject = async ({projectId}) => {
  try {
    await executeSQL(
        [
          `BEGIN TRANSACTION;`,
          `DELETE FROM ${TABLES.project} WHERE id = ${SqlString.escape(
              projectId,
          )};`,
          `DELETE FROM ${
            TABLES.projectDingtalkGroup
          } WHERE project_id = ${SqlString.escape(projectId)};`,
        ].join(''),
    );
  } catch (e) {
    logger.error(e);
  }
};

// 业务编辑
const editProject = async ({
  projectId,
  projectName,
  repositoryUrl,
  remark,
}) => {
  const setSQL = [];
  if (projectName) {
    setSQL.push(`project_name = ${SqlString.escape(projectName)}`);
  }
  if (repositoryUrl) {
    setSQL.push(`repository_url = ${SqlString.escape(repositoryUrl)}`);
  }
  if (remark) {
    setSQL.push(`remark = ${SqlString.escape(remark)}`);
  }
  try {
    if (setSQL.length) {
      await executeSQL(`UPDATE ${TABLES.project} SET 
      ${setSQL.join(',')} 
      WHERE id = ${SqlString.escape(projectId)};`);
    }
  } catch (e) {
    logger.error(e);
  }
};

module.exports = {
  initTables,
  initData,
  getValue,
  deleteKeyValue,
  setValue,
  // 业务查询
  getProjects,
  getDingtalkGroups,
  // 业务新增
  addProject,
  // 业务删除
  deleteProject,
  // 业务编辑
  editProject,
};
