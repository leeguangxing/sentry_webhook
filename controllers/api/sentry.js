/* eslint-disable max-len */
/* eslint-disable camelcase */
// notice
const {alertMarkDown} = require('../../lib/alertIntegration/dingtalk');
const {
  getDingtalkGroups,
} = require('../../dbModule');

module.exports = async (ctx, next) => {
  try {
    const {
      project_name,
      level,
      url: path,
      event: {
        title,
        location,
        request: {url, fragment},
        user: {ip_address}},
    } = ctx.request.body;
    const dingTalkGroups = await getDingtalkGroups();
    if (dingTalkGroups && dingTalkGroups.length) {
      const {access_token, secret} = dingTalkGroups[0];
      alertMarkDown({
        title: `${project_name} 异常告警`,
        text: `# ${project_name}  
        【Level】${level}  
        【Message】${title}  
        【Href】${url}  
        【Path】${fragment}  
        【Source】${location}  
        【User IP】${ip_address}  
        【Issue】[点击这里](${path})`,
        access_token,
        secret,
      });
    }
  } catch (e) {
    ctx.logger.error(e);
  }

  ctx.body = {
    code: 200,
    msg: 'ok',
  };
};
