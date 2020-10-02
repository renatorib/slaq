import { matcherStore } from "slaq-utils";
import _debug from "debug";

const debug = _debug("slaq:options");

const slaqOptions = (app: any) => {
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

export default slaqOptions;

// backwards compatibility
module.exports = slaqOptions;
