const {
  deleteProject,
} = require('../../dbModule');

const {ITEM_NAME} = require('../../const');

module.exports = async (ctx, next) => {
  const {itemName} = ctx.params;

  switch (itemName) {
    case ITEM_NAME.project:
      {
        const {projectId} = ctx.request.body;
        await deleteProject({projectId});
      }
      break;
  }

  ctx.body = {
    code: 200,
    msg: 'ok',
  };
};
