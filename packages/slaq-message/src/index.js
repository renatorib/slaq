const { matcherStore } = require("slaq-utils");

const slaqMessage = app => {
  app.message = matcherStore({
    defaultHandler: (req, res) => res.ack()
  });

  app.event("message", (req, res) => {
    const { event } = req.body;

    if (event.bot_id || event.subtype) {
      return;
    }

    app.message.dispatch(event.text)(req, res);
  });
};

module.exports = slaqMessage;
