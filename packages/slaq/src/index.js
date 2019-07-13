const express = require("express");

const slaqEvents = require("slaq-events");
const slaqCommands = require("slaq-commands");

const parseRequestBody = require("./core/parseRequestBody");
const parseResponseHelpers = require("./core/parseResponseHelpers");
const createClient = require("./core/createClient");

const slaq = ({ name, signingSecret, token } = {}) => {
  const app = express();
  const client = createClient({ token });
  app.client = client;

  const use = fn => fn(app);
  use(parseRequestBody);
  use(parseResponseHelpers);

  return {
    app,
    use,
    client,
    listen: (...args) => {
      app.use((req, res) => res.sendStatus(404));
      app.listen(...args);
    }
  };
};

exports.slaq = slaq;
