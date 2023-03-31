const nodemailer = require('nodemailer');

const sendEmail = ({transportConfig, msg, receivers}) => {
  // {
  //   transportConfig: {
  //     pool: true,
  //     secure: true,
  //     host: 'smtp.qiye.aliyun.com',
  //     auth: {
  //       user: 'example@leeguangxing.cn',
  //       pass: 'password_here',
  //     },
  //   },
  //   msg: {
  //     from: 'example@leeguangxing.cn',
  //     subject: `【构建${status}】${pName}`,
  //     html: `构建详情：<a href="${url}" target="_blank">${url}</a>`,
  //   },
  //   receivers: ['example@foxmail.com', 'example@163.com'],
  // }

  // https://nodemailer.com/smtp/
  const transporter = nodemailer.createTransport(transportConfig);
  receivers.forEach((to) => {
    transporter.sendMail(
        {
          ...msg,
          to,
        },
        (err) => {
          if (err) {
            console.error('邮件发送时发生错误！');
          }
        },
    );
  });
};

module.exports = {
  sendEmail,
};
