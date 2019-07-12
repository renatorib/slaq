const express = require("express");
const rawBody = require("raw-body");
const qs = require("querystring");

const parseBody = async (req, res, next) => {
  const stringBody =
    (req.rawBody && req.rawBody.toString()) || (await rawBody(req)).toString();
  const contentType = req.headers["content-type"];

  const getBody = () => {
    if (contentType === "application/x-www-form-urlencoded") {
      const parsedBody = qs.parse(stringBody);
      console.log({ parsedBody });
      if (typeof parsedBody.payload === "string") {
        return JSON.parse(parsedBody.payload);
      } else {
        return parsedBody;
      }
    } else if (contentType === "application/json") {
      return JSON.parse(stringBody);
    } else {
      try {
        return JSON.parse(stringBody);
      } catch (e) {
        console.error("Failed to parse body");
      }
    }
  };

  req.body = getBody();
  req.stringBody = stringBody;

  next();
};

const notFound = (req, res) => {
  res.statusCode = 404;
  res.send();
};

const slapEvents = app => {
  app.events = new Map();

  app.post("/events", (req, res, next) => {
    if (req.body.type === "url_verification") {
      res.send(req.body.challenge);
      return;
    } else if (req.body.type === "event_callback") {
      const { type } = req.body.event;
      const handler = app.events[req.body.event.type];

      if (app.events.has(type)) {
        const handler = app.events.get(type);
        if (typeof handler === "function") handler(req, res, next);
      } else {
        console.log(`Unhandled event_callback of type ${type}`, req.body);
        next();
      }
    } else {
      console.log(`Unhandled event of type ${req.body.type}`);
      next();
    }
  });
};

const slaqMessage = app => {
  app.events.set("message", (req, res) => {
    console.log(req.body);
    res.send({
      text: `\`\`\`${JSON.stringify(req.body, null, 2)}\`\`\``
    });
  });
};

const slap = ({ name, signingSecret, token } = {}) => {
  const app = express();
  const use = fn => fn(app);

  const setup = () => {
    app.use(parseBody);
  };

  const beforeStart = () => {
    app.use(notFound);
  };

  setup();

  return {
    app,
    use,
    listen: (...args) => {
      beforeStart();
      app.listen(...args);
    }
  };
};

const jiraya = slap({
  name: "Jiraya",
  signingSecret: "076dcfbb66bf7e30f7a18a521d14194d",
  botUserToken: "xoxb-663287672934-649772412147-3wTEEfGRpXe55tH9oF0DVgfb"
});

jiraya.use(slapEvents);
jiraya.use(slaqMessage);

jiraya.listen(3000, () => console.log("Jiraya ready"));
