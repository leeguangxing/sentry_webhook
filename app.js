const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');

const config = require('./config');

// routes
const index = require('./routes');

// database
const {initTables, initData} = require('./dbModule');
const {initDB} = require('./lib/sqlite3');

// logger
const {logger, log4js} = require('./lib/log4js');

const port = process.env.PORT || config.port;

// init database
(async () => {
  try {
    await initDB();
    await initTables();
    await initData();
  } catch (e) {
    logger.error(e);
  }
})();

// error handler
onerror(app);

// middleware
app
    .use(bodyparser())
    .use(json())
    .use( (ctx, next) => {
      ctx.logger = logger;
      return next();
    })
    .use(router.routes())
    .use(router.allowedMethods());

// routes
app.use(index.routes());

app.on('error', function(err, ctx) {
  console.log(err);
  logger.error(err);
});

// const shutDown = async () => {
//   try {
//   // 关闭 log4js
//     log4js.shutdown();
//   } catch (e) {
//     console.error('shut down error: ', e);
//   }
// };

// process.on('SIGINT', async () => {
//   await shutDown();
// });

// process.on('message', async (msg) => {
//   if (msg === 'shutdown') {
//     await shutDown();
//   }
// });

module.exports = app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
  // 发送就绪信号
  // process.send && process.send('ready');
});
