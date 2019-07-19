const express = require("express");

const parseRequestBody = require("./core/parseRequestBody");
const useSlackClient = require("./core/useSlackClient");
const useResponseHelpers = require("./core/useResponseHelpers");
const verifySigningSecret = require("./core/verifySigningSecret");
const handleUrlVerification = require("./core/handleUrlVerification");

const bootstrap = app => {
  // Return 404 to unhandled middlewares
  app.use((req, res, next) => {
    // TODO: check if response already sent
    res.sendStatus(404);
    next();
  });
  // Return 500 to unhandled errors
  // eslint-disable-next-line
  app.use((err, req, res, next) => {
    if (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  });
};

const slaq = ({ name, token, signingSecret } = {}) => {
  const app = express();

  /* Set slaq config */
  app.slaq = {
    name,
    token,
    signingSecret
  };

  /* Load core functionality */
  parseRequestBody(app);
  useSlackClient(app);
  useResponseHelpers(app);
  verifySigningSecret(app);
  handleUrlVerification(app);

  return {
    // Exposes app instance
    app,
    // Exposes entire app to hook functionality
    use: fn => fn(app),
    // Start app
    listen: (...args) => {
      bootstrap(app);
      app.listen(...args);
    }
  };
};

exports.slaq = slaq;
