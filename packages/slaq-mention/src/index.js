const { matcherStore } = require("slaq-utils");

const slaqMention = app => {
  app.mention = matcherStore();

  app.event("app_mention", (req, res) => {
    app.mention.dispatch(req.body.event.text)(req, res);
  });
};

module.exports = slaqMention;
