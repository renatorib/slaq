const { matcherStore } = require("slaq-utils");

const slaqCommands = app => {
  app.command = matcherStore({
    defaultHandler: (req, res) => res.ack()
  });

  app.use((req, res, next) => {
    if (req.type === "command") {
      app.command.dispatch(req.body.command)(req, res, next);
    } else {
      next();
    }
  });
};

module.exports = slaqCommands;
