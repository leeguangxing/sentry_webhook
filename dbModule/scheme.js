/* eslint-disable max-len */
// 表结构定义

const TABLES = {
  keyValue: 'key_value',
  dingTalkGroup: 'dingtalk_group',
  project: 'project',
  projectDingtalkGroup: 'project_dingtalk_group',
};

// 基础键值对表
const keyValueTableScheme = `CREATE TABLE IF NOT EXISTS ${TABLES.keyValue} (
  "key" VARCHAR(50) NOT NULL UNIQUE,
  "value" VARCHAR(1000),
  PRIMARY KEY("key")
);`;

// 钉钉群列表
const dingTalkGroupTableScheme = `CREATE TABLE IF NOT EXISTS ${
  TABLES.dingTalkGroup
} (
  "id" INTEGER NOT NULL UNIQUE,
  "group_name" VARCHAR(50) NOT NULL UNIQUE,
  "access_token" VARCHAR(100),
  "secret" VARCHAR(20),
  "remark" VARCHAR(100),
  PRIMARY KEY("id" AUTOINCREMENT)
);`;

// 项目列表
const projectTableScheme = `CREATE TABLE IF NOT EXISTS ${
  TABLES.project
} (
  "id" INTEGER NOT NULL UNIQUE,
  "project_name" VARCHAR(50) NOT NULL UNIQUE,
  "repository_url" VARCHAR(200),
  "remark" VARCHAR(100),
  PRIMARY KEY("id" AUTOINCREMENT)
);`;

// 项目钉钉群关联表
const projectDingtalkGroupTableScheme = `CREATE TABLE IF NOT EXISTS ${
  TABLES.projectDingtalkGroup
} (
  "id" INTEGER NOT NULL UNIQUE,
  "project_id" INTEGER NOT NULL,
  "dingtalk_group_id" INTEGER NOT NULL,
  PRIMARY KEY("id" AUTOINCREMENT)
);`;

const allSchemes = [
  keyValueTableScheme,
  dingTalkGroupTableScheme,
  projectTableScheme,
  projectDingtalkGroupTableScheme,
];

// 初始化数据
const projectTableData =
`INSERT INTO ${TABLES.project} ('project_name', 'repository_url', 'remark') 
VALUES 
('dms-system', 'https://git.skintific.cn/frontend/dms-system', 'DMS System 后台项目');`;

const dingTalkGroupTableData =
`INSERT INTO ${TABLES.dingTalkGroup} ('group_name', 'access_token', 'secret', 'remark') 
VALUES 
('sentry-dingtalk-group', 'f80c73e3cf49bca2c058228e4c50018496d221fdaff356731a52aaa7dc45727a', 'SEC34992e795f7f8fd033decb6a649f51acc4f098d5eaebcbee99a706d43b421ca9', 'sentry异常通知钉钉群');`;

const projectDingTalkGroupTableData =
`INSERT INTO ${TABLES.projectDingtalkGroup} ('project_id', 'dingtalk_group_id') VALUES ('1', '1');`;

module.exports = {
  TABLES,
  allSchemes,
  projectTableData,
  dingTalkGroupTableData,
  projectDingTalkGroupTableData,
};
