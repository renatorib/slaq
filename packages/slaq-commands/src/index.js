const { matcherStore } = require("slaq-utils");

const slaqCommands = app => {
  app.command = matcherStore();

  app.post("/commands", (req, res, next) => {
    app.command.dispatch(req.body.command)(req, res, next);
  });
};

module.exports = slaqCommands;
