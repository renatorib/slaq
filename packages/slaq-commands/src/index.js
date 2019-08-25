const { matcherStore } = require("slaq-utils");
const debug = require("debug")("slaq:commands");

const slaqCommands = app => {
  app.command = matcherStore({
    defaultHandler: (req, res) => res.ack()
  });

  app.use((req, res, next) => {
    if (req.type === "command") {
      debug(`Received slash command '${req.body.command}'`);
      debug(req.body);
      app.command.dispatch(req.body.command)(req, res, next);
    } else {
      next();
    }
  });
};

module.exports = slaqCommands;
