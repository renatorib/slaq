declare global {
  namespace Express {
    interface Request {
      type: string;
      user: string;
      channel?: string;
    }
  }
}

import rawBody from "raw-body";
import qs from "querystring";
import { infer } from "../helpers/infer";
import { Module } from "../index";

export const parseRequestBody: Module = app => {
  app.use(async (req, res, next) => {
    const stringBody = (await rawBody(req)).toString();
    const contentType = req.headers["content-type"];

    const getBody = () => {
      if (contentType === "application/x-www-form-urlencoded") {
        const parsedBody = qs.parse(stringBody);
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

    const { type, channel, user } = infer(req);

    req.type = type;
    req.channel = channel;
    req.user = user;

    next();
  });
};
