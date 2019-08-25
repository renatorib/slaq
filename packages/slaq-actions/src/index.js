const { matcherStore } = require("slaq-utils");
const debug = require("debug")("slaq:actions");

const slaqActions = app => {
  app.blockAction = matcherStore();
  app.messageAction = matcherStore();

  app.use((req, res, next) => {
    if (req.type === "action") {
      if (req.body.type === "block_actions") {
        res.ack();
        debug(`Received 'block_actions' event`);
        debug(req.body);

        req.body.actions.forEach(action => {
          app.blockAction.dispatch(action.action_id)(req, res, next);
        });
      } else if (req.body.type === "message_action") {
        res.ack();
        debug(`Received 'message_action' event`);
        debug(req.body);

        app.messageAction.dispatch(req.body.callback_id)(req, res, next);
      } else {
        next();
      }
    } else {
      next();
    }
  });
};

module.exports = slaqActions;
