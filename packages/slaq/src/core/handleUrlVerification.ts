import { Module } from "../index";

export const handleUrlVerification: Module = app => {
  app.use((req, res, next) => {
    if (req.body.type === "url_verification") {
      res.ack(req.body.challenge);
      return;
    }

    next();
  });
};
