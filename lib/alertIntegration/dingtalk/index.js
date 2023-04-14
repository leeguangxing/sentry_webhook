/* eslint-disable max-len */
/* eslint-disable camelcase */
const https = require('https');
// const {createHmac} = require('crypto');

// 加签 post 方式发送 markdown 信息到顶顶群
const alertMarkDown = ({
  title, // 消息标题
  text, // markdown 字符
  access_token, // webhook 链接上的 access_token
  secret, // 加签 secret
}) => {
  return new Promise((resolve) => {
    // https://open.dingtalk.com/document/group/custom-robot-access
    const timestamp = new Date().getTime();
    // const hash = createHmac('sha256', secret)
    //     .update(`${timestamp}\n${secret}`)
    //     .digest('base64');
    // const sign = encodeURIComponent(hash);

    const reqData = {
      msgtype: 'markdown',
      markdown: {
        title,
        text,
      },
    };

    const post_req = https.request(
        {
          host: 'oapi.dingtalk.com',
          // path: `/robot/send?access_token=${access_token}&timestamp=${timestamp}&sign=${sign}`,
          path: `/robot/send?access_token=${access_token}&timestamp=${timestamp}`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
        (res) => {
          const dataArray = [];
          let size = 0;
          res.on('data', (data) => {
            dataArray.push(data);
            size += data.length;
          });
          res.on('end', () => {
            const buff = Buffer.concat(dataArray, size);
            const result = buff.toString('utf8');
            resolve(result);
          });
        },
    );

    post_req.on('error', function(e) {
      // 考虑没有后续的重发机制，暂时不 reject 错误，仅控制台显示
      console.error(e);
      resolve(false);
    });

    // 发送数据
    post_req.write(JSON.stringify(reqData));
    post_req.end();
  });
};

module.exports = {
  alertMarkDown,
};
