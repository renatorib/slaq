const handleUrlVerification = app => {
  app.use((req, res, next) => {
    if (req.body.type === "url_verification") {
      res.ack(req.body.challenge);
      return;
    }

    next();
  });
};

module.exports = handleUrlVerification;
