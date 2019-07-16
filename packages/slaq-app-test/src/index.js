const { slaq } = require("slaq");

const jiraya = slaq({
  name: "Jiraya",
  signingSecret: "076dcfbb66bf7e30f7a18a521d14194d",
  token: "xoxb-663287672934-649772412147-vNAOZwqujdFvOPd2hGNbhaeN"
});

jiraya.use(require("slaq-events"));
jiraya.use(require("slaq-commands"));
jiraya.use(require("slaq-message"));

jiraya.use(app => {
  app.command("/say-hello", (req, res) => {
    res.ack("Hello");
  });

  app.event("app_mention", (req, res) => {
    // `req.body` holds the slack payload sent to your app
    const { event } = req.body;
    res.ack(); // response with http 200 so Slack knows that everything is fine

    res.say({
      text: `Hello <@${event.user}>, what's up?`,
      thread_ts: event.ts // reply to message thread
    });
  });

  app.message("hey", (req, res) => {
    res.ack();
    res.say("hey :)");
  });

  app.message(/(hi|hello)/i, (req, res) => {
    res.ack();
    res.say("Hello!");
  });

  app.message(
    text => text === "foo",
    (req, res) => {
      res.ack();
      res.say("Bar!");
    }
  );

  app.message([/test(1|2)/i, text => text === "test3"], (req, res) => {
    res.ack();
    res.say("A lot of tests handled together");
  });

  app.message((req, res) => {
    res.ack();
    res.say("My reply to everything else");
  });
});

jiraya.listen(3000, () => console.log("Jiraya ready"));
