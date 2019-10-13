const { matcherStore } = require("slaq-utils");
const uuid = require("uuid");
const debug = require("debug")("slaq:dialog");

const slaqDialogs = app => {
  const dialogStore = matcherStore();

  const openDialog = (callback_id, input) => {
    const { trigger_id, dialog, ...rest } = input;

    return app.client.web("dialog.open", {
      trigger_id,
      dialog: JSON.stringify({ ...dialog, callback_id }),
      ...rest
    });
  };

  // app.dialog method is stateful since it relies on
  // memory state between two different http calls.
  //
  // This only still exists due to backward compability
  app.dialog = (input, handle) => {
    if (typeof input === "object" && typeof handle === "function") {
      const callback_id =
        (input && input.dialog && input.dialog.callback_id) || uuid();
      openDialog(callback_id, input);
      return dialogStore(callback_id, handle);
    }

    return dialogStore(input, handle);
  };

  // So there's an alternative for stateless applications
  // that can't guarantee memory state between http calls
  app.openDialog = openDialog;
  app.onDialogSubmission = dialogStore;

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
