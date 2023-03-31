const router = require('koa-router')();
const controllers = require('../controllers');

// 【API】
router.get('/', async (ctx, next) => {
  ctx.body = {
    code: 200,
    msg: 'ok',
  };
});

// sentry webhook
router.post('/sentry', controllers.api.sentry);

// 数据获取列表
router.get('/:itemName/get', controllers.api.getList);

// 新增数据记录
router.post('/:itemName/add', controllers.api.addRecord);

// 删除数据记录
router.post('/:itemName/delete', controllers.api.deleteRecord);

// 编辑数据记录
router.post('/:itemName/edit', controllers.api.editRecord);

module.exports = router;
