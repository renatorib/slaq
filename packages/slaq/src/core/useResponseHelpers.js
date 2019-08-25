const infer = require("../helpers/infer");
const debug = require("debug")("slaq");

const parseResponseHelpers = app => {
  app.use((req, res, next) => {
    const { channel, user } = infer(req);

    const say = message => {
      return app.client.web("chat.postMessage", {
        channel,
        ...(typeof message === "string" ? { text: message } : { ...message })
      });
    };

    const pm = message => {
      return app.client.web("chat.postMessage", {
        channel: user,
        ...(typeof message === "string" ? { text: message } : { ...message })
      });
    };

    const whisper = message => {
      return app.client.web("chat.postEphemeral", {
        channel,
        user,
        ...(typeof message === "string" ? { text: message } : { ...message })
      });
    };

    const ack = message => {
      res.status(200).send(message);
    };

    const respond = message => {
      if (req.body.response_url) {
        return app.client.hook(req.body.response_url, {
          ...(typeof message === "string" ? { text: message } : { ...message })
        });
      } else {
        debug("You can only 'respond' to a request with 'response_url'");
      }
    };

    res.say = say;
    res.pm = pm;
    res.whisper = whisper;
    res.ack = ack;
    res.respond = respond;

    next();
  });
};

module.exports = parseResponseHelpers;
