const log4js = require('log4js');
const path = require('path');

const pattern = '%d{yyyy-MM-dd hh:mm:ss.SSS} [%p] %c - %m';

log4js.configure({
  appenders: {
    file: {
      type: 'file',
      filename: path.join(process.cwd(), 'app.log'),
      maxLogSize: 1024 * 1024 * 10, // 10M
      backups: 10,
      compress: false,
      layout: {
        type: 'pattern',
        pattern,
      },
    },
  },
  // 声明默认 logger
  categories: {default: {appenders: ['file'], level: 'error'}},
  pm2: true,
});

const logger = {
  info(data) {
    const level = 'info';
    const defaultLogger = log4js.getLogger();
    const content = typeof data === 'string' ? data : JSON.stringify(data);
    if (process.env.LOG_IN_CONSOLE === 'true') {
      console.info(content);
    }
    defaultLogger.level = level;
    defaultLogger[level](content);
  },
  error(err) {
    const level = 'error';
    const defaultLogger = log4js.getLogger();
    const content = err.message || JSON.stringify(err);
    if (process.env.LOG_IN_CONSOLE === 'true') {
      console.error(content);
    }
    defaultLogger.level = level;
    defaultLogger[level](content);
  },
};

module.exports = {
  logger,
  log4js, // 同时导出实例，可通过 log4js.shutdown() 关闭日志
};
