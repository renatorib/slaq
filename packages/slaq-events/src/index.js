const { matcherStore } = require("slaq-utils");
const debug = require("debug")("slaq:events");

const slaqEvents = app => {
  app.event = matcherStore({
    defaultHandler: (req, res) => res.ack()
  });

  app.post("/events", (req, res, next) => {
    if (req.body.type === "url_verification") {
      debug(`Received 'url_verification' event`);
      res.ack(req.body.challenge);
    } else if (req.body.type === "event_callback") {
      const { type } = req.body.event;
      debug(`Received 'event_callback' event of type ${type}`);
      debug(req.body);
      app.event.dispatch(type)(req, res, next);
    } else {
      debug(`Received unhandled '${req.body.type}' event`);
      res.ack();
    }
  });
};

module.exports = slaqEvents;
