const { matcherStore } = require("slaq-utils");
const debug = require("debug")("slaq:events");

const slaqEvents = app => {
  app.event = matcherStore({
    defaultHandler: (req, res) => res.ack()
  });

  app.use((req, res, next) => {
    if (req.type === "event") {
      if (req.body.type === "event_callback") {
        const { type } = req.body.event;
        debug(`Received 'event_callback' event of type ${type}`);
        debug(req.body);
        app.event.dispatch(type)(req, res, next);
      } else {
        debug(`Received unhandled '${req.body.type}' event`);
        res.ack();
      }
    } else {
      next();
    }
  });
};

module.exports = slaqEvents;
