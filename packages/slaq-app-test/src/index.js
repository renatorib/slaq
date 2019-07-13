const { slaq } = require("slaq");

const jiraya = slaq({
  name: "Jiraya",
  signingSecret: "076dcfbb66bf7e30f7a18a521d14194d",
  token: "xoxb-663287672934-649772412147-3wTEEfGRpXe55tH9oF0DVgfb"
});

jiraya.use(require("slaq-events"));
jiraya.use(require("slaq-commands"));
jiraya.use(require("slaq-message"));

jiraya.listen(3000, () => console.log("Jiraya ready"));
