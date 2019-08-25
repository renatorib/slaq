const { matcherStore } = require("slaq-utils");
const uuid = require("uuid");
const debug = require("debug")("slaq:dialog");

const slaqDialogs = app => {
  const dialogStore = matcherStore();

  app.dialog = (input, handle) => {
    if (typeof input === "object" && typeof handle === "function") {
      const { trigger_id, dialog, ...rest } = input;
      const callback_id = dialog.callback_id || uuid();

      app.client.web("dialog.open", {
        trigger_id,
        dialog: JSON.stringify({ ...dialog, callback_id }),
        ...rest
      });

      return dialogStore(callback_id, handle);
    }

    return dialogStore(input, handle);
  };

  app.use((req, res, next) => {
    if (req.type === "action") {
      if (req.body.type === "dialog_submission") {
        res.ack();
        debug(`Received 'dialog_submission' event`);
        debug(req.body);

        dialogStore.dispatch(req.body.callback_id)(req, res, next);
      } else {
        next();
      }
    } else {
      next();
    }
  });
};

module.exports = slaqDialogs;
