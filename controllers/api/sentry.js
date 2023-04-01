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
    console.log(new Date());
    console.log(ctx.request.body);
    // {
    //   id: '27',
    //   project: 'dms-system',
    //   project_name: 'dms-system',
    //   project_slug: 'dms-system',
    //   logger: null,
    //   level: 'error',
    //   culprit: 'raven.scripts.runner in main',
    //   message: 'This is an example Python exception',
    //   url: 'https://sentry.leeguangxing.cn/organizations/sentry/issues/27/?referrer=webhooks_plugin',
    //   triggering_rules: [],
    //   event: {
    //     event_id: '2a4a9302e7a94b35b866225bd9309c12',
    //     level: 'error',
    //     version: '5',
    //     type: 'default',
    //     logentry: {
    //       formatted: 'This is an example Python exception',
    //       message: null,
    //       params: null
    //     },
    //     logger: '',
    //     modules: { 'my.package': '1.0.0' },
    //     platform: 'python',
    //     timestamp: 1680258401.294,
    //     received: 1680258461.303159,
    //     environment: 'prod',
    //     user: {
    //       id: '1',
    //       email: 'sentry@example.com',
    //       ip_address: '127.0.0.1',
    //       username: 'sentry',
    //       name: 'Sentry',
    //       geo: [Object]
    //     },
    //     request: {
    //       url: 'http://example.com/foo',
    //       method: 'GET',
    //       data: [Object],
    //       query_string: [Array],
    //       cookies: [Array],
    //       headers: [Array],
    //       env: [Object],
    //       inferred_content_type: 'application/json',
    //       fragment: null
    //     },
    //     contexts: { browser: [Object], client_os: [Object] },
    //     stacktrace: { frames: [Array] },
    //     tags: [
    //       [Array], [Array],
    //       [Array], [Array],
    //       [Array], [Array],
    //       [Array], [Array],
    //       [Array]
    //     ],
    //     extra: {
    //       emptyList: [],
    //       emptyMap: {},
    //       length: 10837790,
    //       results: [Array],
    //       session: [Object],
    //       unauthorized: false,
    //       url: 'http://example.org/foo/bar/'
    //     },
    //     fingerprint: [ '{{ default }}' ],
    //     hashes: [ '3a2b45089d0211943e5a6645fb4cea3f' ],
    //     culprit: 'raven.scripts.runner in main',
    //     metadata: { title: 'This is an example Python exception' },
    //     title: 'This is an example Python exception',
    //     location: null,
    //     _ref: 2,
    //     _ref_version: 2,
    //     _metrics: { 'bytes.stored.event': 8035 },
    //     nodestore_insert: 1680258461.346186,
    //     id: '2a4a9302e7a94b35b866225bd9309c12'
    //   }
    // }
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
