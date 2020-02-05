import { Module } from "../index";
import crypto from "crypto";
import tsscmp from "tsscmp";

const verify = (
  body: string,
  secret: string,
  signature: string,
  timestamp: number
) => {
  const fiveMinutesAgo = Math.floor(Date.now() / 1000) - 60 * 5;

  if (timestamp < fiveMinutesAgo) {
    throw Error(
      "Slack request signing verification failed. Timestamp is too old."
    );
  }

  const hmac = crypto.createHmac("sha256", secret);
  const [version, hash] = signature.split("=");
  hmac.update(`${version}:${timestamp}:${body}`);

  if (!tsscmp(hash, hmac.digest("hex"))) {
    throw Error(
      "Slack request signing verification failed. Signature mismatch."
    );
  }

  return true;
};

export const verifySigningSecret: Module = app => {
  const secret = app.slaq.signingSecret;

  app.use((req, res, next) => {
    const body = req.stringBody;
    const signature = req.headers["x-slack-signature"] as string;
    const requestTimestamp = req.headers["x-slack-request-timestamp"] as string;
    const timestamp = parseInt(requestTimestamp);

    try {
      verify(body, secret, signature, timestamp);
      next();
    } catch (e) {
      next(e);
    }
  });
};
