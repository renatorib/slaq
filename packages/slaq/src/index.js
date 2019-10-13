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

const createApp = ({ name, token, signingSecret, modules = [] } = {}) => {
  const app = express.Router();

  app.slaq = {
    name,
    token,
    signingSecret
  };

  /* Load all core functionality */
  parseRequestBody(app);
  useSlackClient(app);
  useResponseHelpers(app);
  verifySigningSecret(app);
  handleUrlVerification(app);

  const use = fn => fn(app);
  modules.forEach(use);

  return {
    app,
    use
  };
};

const createServer = (apps = {}) => {
  const app = express();

  Object.keys(apps).forEach(key => {
    app.use(key, apps[key].app);
  });

  return {
    app,
    listen: (...args) => {
      bootstrap(app);
      app.listen(...args);
    }
  };
};

// This needed due to a backward compatiblity
const slaq = config => {
  const app = createApp(config);
  const server = createServer({ "/": app });

  return {
    ...app,
    ...server
  };
};

exports.createServer = createServer;
exports.createApp = createApp;
exports.slaq = slaq;
