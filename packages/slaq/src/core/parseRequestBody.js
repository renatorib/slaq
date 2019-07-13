const rawBody = require("raw-body");
const qs = require("querystring");
const infer = require("../helpers/infer");

const parseRequestBody = app => {
  app.use(async (req, res, next) => {
    const stringBody =
      (req.rawBody && req.rawBody.toString()) ||
      (await rawBody(req)).toString();
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

    const { type, channel } = infer(req);

    req.type = type;
    req.channel = channel;

    next();
  });
};

module.exports = parseRequestBody;
