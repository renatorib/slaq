const createClient = require("../client/createClient");

const useSlackClient = app => {
  app.client = createClient({ token: app.slaq.token });
};

module.exports = useSlackClient;
