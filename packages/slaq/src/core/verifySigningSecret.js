const crypto = require("crypto");
const tsscmp = require("tsscmp");

const verify = (body, secret, signature, timestamp) => {
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

const verifySigningSecret = app => {
  const secret = app.slaq.signingSecret;

  app.use((req, res, next) => {
    const body = req.stringBody;
    const signature = req.headers["x-slack-signature"];
    const timestamp = parseInt(req.headers["x-slack-request-timestamp"]);

    try {
      verify(body, secret, signature, timestamp);
      next();
    } catch (e) {
      next(e);
    }
  });
};

module.exports = verifySigningSecret;
