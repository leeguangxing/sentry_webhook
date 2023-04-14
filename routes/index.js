const router = require('koa-router')();
const controllers = require('../controllers');

// health check
router.get('/', async (ctx, next) => {
  ctx.body = {
    code: 200,
    msg: 'ok',
  };
});

// sentry webhook
router.post('/sentry', controllers.api.sentry);

module.exports = router;
