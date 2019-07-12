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

const slapEvents = app => {
  app.post("/events", (req, res, next) => {
    if (req.body.type === "url_verification") {
      res.send(req.body.challenge);
    }
  });
};

const slap = ({ name, signingSecret, token } = {}) => {
  const app = express();
  app.use(parseBody);

  const use = fn => fn(app);
  use(slapEvents);

  app.use((req, res) => {
    res.statusCode = 404;
    res.send();
  });

  //app.listen(3000, () => console.log("Jiraya ready"));

  return {
    app,
    use: handler => {},
    listen: app.listen.bind(app)
  };
};

const jiraya = slap({
  name: "Jiraya",
  signingSecret: "076dcfbb66bf7e30f7a18a521d14194d",
  botUserToken: "xoxb-663287672934-649772412147-3wTEEfGRpXe55tH9oF0DVgfb"
});

jiraya.listen(3000, () => console.log("Jiraya ready"));
