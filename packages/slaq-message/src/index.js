const { matcherStore } = require("slaq-utils");

const slaqMessage = app => {
  app.message = matcherStore();

  app.event("message", (req, res) => {
    const { event } = req.body;

    if (event.bot_id || event.subtype) {
      res.sendStatus(200);
      return;
    }

    app.message.dispatch(event.text)(req, res);
  });
};

module.exports = slaqMessage;
