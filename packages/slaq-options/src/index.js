const { matcherStore } = require("slaq-utils");
const debug = require("debug")("slaq:options");

const slaqOptions = app => {
  app.options = matcherStore({
    defaultHandler: () => {}
  });

  app.use((req, res, next) => {
    if (req.type === "options") {
      debug(`Received '${req.body.type}' event of name '${req.body.name}'`);
      debug(req.body);
      app.options.dispatch(req.body.name)(req, res, next);
    } else {
      next();
    }
  });
};

module.exports = slaqOptions;
