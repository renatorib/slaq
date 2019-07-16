const express = require("express");

const parseRequestBody = require("./core/parseRequestBody");
const parseResponseHelpers = require("./core/parseResponseHelpers");
const verifySigningSecret = require("./core/verifySigningSecret");

const createClient = require("./client/createClient");

const slaq = ({ name, token, signingSecret } = {}) => {
  const app = express();
  app.slaq = {
    name,
    token,
    signingSecret
  };

  const client = createClient({ token });
  app.client = client;

  const use = fn => fn(app);
  use(parseRequestBody);
  use(parseResponseHelpers);
  use(verifySigningSecret);

  return {
    app,
    use,
    client,
    listen: (...args) => {
      app.use((req, res) => {
        res.sendStatus(404);
      });
      // eslint-disable-next-line
      app.use((err, req, res, next) => {
        if (err) {
          console.error(err);
          res.status(500).send(err.message);
        }
      });
      app.listen(...args);
    }
  };
};

exports.slaq = slaq;
