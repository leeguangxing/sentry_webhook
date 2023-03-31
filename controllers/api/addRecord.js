const {
  addProject,
} = require('../../dbModule');

const {ITEM_NAME} = require('../../const');

module.exports = async (ctx, next) => {
  const {itemName} = ctx.params;

  switch (itemName) {
    case ITEM_NAME.project:
      {
        const {projectName, repositoryUrl = '', remark = ''} = ctx.request.body;
        await addProject({projectName, repositoryUrl, remark});
      }
      break;
  }

  ctx.body = {
    code: 200,
    msg: 'ok',
  };
};
