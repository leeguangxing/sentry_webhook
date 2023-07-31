/* eslint-disable max-len */
/* eslint-disable camelcase */
// notice
const {alertMarkDown} = require('../../lib/alertIntegration/dingtalk');
const {checkMsgWhiteList} = require('../../util/index')

module.exports = async (ctx, next) => {
  try {
    // 请求地址 dingtalk webhook
    const {webhook} = ctx.request.query;
    const {searchParams} = new URL(webhook);
    const access_token = searchParams.get('access_token');

    // sentry 信息体
    const {
      project_name,
      level,
      url: path,
      event: {
        title,
        location,
        environment,
        request: {url, fragment},
        user: {ip_address}},
    } = ctx.request.body;

		// 不在白名单的信息才发送
		if(checkMsgWhiteList(title)) {
			await alertMarkDown({
				title: `${project_name} 异常告警`,
				text: [`# ${project_name}`,
					`【Env】${environment}`,
					`【Level】${level}`,
					`【Message】${title}`,
					`【Href】${url}`,
					`【Path】${fragment}`,
					`【Source】${location}`,
					`【User IP】${ip_address}`,
					`【Issue】[点击这里](${path})`].join('\n\n'),
				access_token,
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
