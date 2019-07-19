const infer = require("../helpers/infer");

const parseResponseHelpers = app => {
  app.use((req, res, next) => {
    const { channel } = infer(req);

    const say = message => {
      return app.client.web("chat.postMessage", {
        channel,
        ...(typeof message === "string" ? { text: message } : { ...message })
      });
    };

    const ack = message => {
      res.status(200).send(message);
    };

    const respond = message => {
      console.log("respond", req.body);
      if (req.body.response_url) {
        return app.client.hook(req.body.response_url, {
          ...(typeof message === "string" ? { text: message } : { ...message })
        });
      }
    };

    res.say = say;
    res.ack = ack;
    res.respond = respond;

    next();
  });
};

module.exports = parseResponseHelpers;
