const { whiteListMsg } = require("../config/whiteList");

const checkMsgWhiteList = (msg) => {
  const res = true;
  for (let i = 0; i < whiteListMsg.length; i++) {
    if(msg.indexOf(whiteListMsg[i]) !== -1) {
			res = false
			break
		} 
  }
	return res
};

module.exports = {
  checkMsgWhiteList,
};
