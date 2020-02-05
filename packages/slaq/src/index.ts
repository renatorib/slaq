declare global {
  namespace Express {
    interface Request {
      stringBody: string;
    }
  }
}

import express, { Application, Router, Express } from "express";

import { parseRequestBody } from "./core/parseRequestBody";
import { useResponseHelpers } from "./core/useResponseHelpers";
import { verifySigningSecret } from "./core/verifySigningSecret";
import { handleUrlVerification } from "./core/handleUrlVerification";

import { createClient, Client } from "./client/createClient";

const bootstrap = (app: Application) => {
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

export type Module = (fn: SlaqExpressApp) => void;

export type CreateAppArgs = {
  token: string;
  signingSecret: string;
  name?: string;
  modules?: Module[];
};

export type SlaqExpressApp = Router & {
  slaq: {
    name?: string;
    token: string;
    signingSecret: string;
  };
  client: Client;
};

export type SlaqApp = {
  app: SlaqExpressApp;
  use: (fn: (app: SlaqExpressApp) => void) => void;
};

export const createApp = ({
  name,
  token,
  signingSecret,
  modules = []
}: CreateAppArgs): SlaqApp => {
  const router = express.Router();

  const app: SlaqExpressApp = Object.assign(router, {
    client: createClient({ token }),
    slaq: {
      name,
      token,
      signingSecret
    }
  });

  /* Load all core functionality */
  parseRequestBody(app);
  useResponseHelpers(app);
  verifySigningSecret(app);
  handleUrlVerification(app);

  const use = (fn: (app: SlaqExpressApp) => void) => fn(app);
  modules.forEach(use);

  return {
    app,
    use
  };
};

export type CreateServerArgs = Partial<{
  [x: string]: SlaqApp;
}>;

export type SlaqServer = {
  app: Express;
  listen: Express["listen"];
};

export const createServer = (apps: CreateServerArgs = {}): SlaqServer => {
  const app = express();

  Object.keys(apps).forEach(key => {
    app.use(key, apps[key].app);
  });

  const listen = (...args) => {
    bootstrap(app);
    return app.listen(...args);
  };

  return {
    app,
    listen
  };
};

// This needed due to a backward compatiblity
export const slaq = (config: CreateAppArgs) => {
  const app = createApp(config);
  const server = createServer({ "/": app });

  return {
    ...app,
    ...server
  };
};
