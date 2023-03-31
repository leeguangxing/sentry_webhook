const {
  getProjects,
} = require('../../dbModule');

const {ITEM_NAME} = require('../../const');

module.exports = async (ctx, next) => {
  const {itemName} = ctx.params;
  let list = [];

  switch (itemName) {
    case ITEM_NAME.project:
      {
        list = await getProjects();
      }
      break;
  }

  ctx.body = {
    code: 200,
    msg: 'ok',
    data: {
      list,
    },
  };
};
