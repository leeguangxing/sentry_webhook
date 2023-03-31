/* eslint-disable max-len */
/* eslint-disable camelcase */
// notice
const {alertMarkDown} = require('../../lib/alertIntegration/dingtalk');
const {
  getDingtalkGroups,
} = require('../../dbModule');

module.exports = async (ctx, next) => {
  try {
    // const {head_commit = {}, repository = {}} = ctx.request.body;
    console.log('-----------');
    console.log(ctx.request.body);
    const dingTalkGroups = await getDingtalkGroups();
    if (dingTalkGroups && dingTalkGroups.length) {
      const {access_token, secret} = dingTalkGroups[0];
      // alertMarkDown({
      //   title: '测试markdown消息',
      //   text: `- error message: test...
      //   - url: https://www.baidu.com`,
      //   access_token,
      //   secret,
      // });
    }
  } catch (e) {
    ctx.logger.error(e);
  }

  ctx.body = {
    code: 200,
    msg: 'ok',
  };
};
