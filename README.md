# [WIP ALERT] Slaq

Lightweight lib to build Slack Apps, very modular.

## Getting Started

```
yarn add slaq
```

Create your new app:

```js
const slaq = require("slaq");

const myapp = slaq({
  token: "YOUR-BOT-USER-OAUTH-TOKEN",
  signingSecret: "YOUR-BOT-SIGNING-SECRET"
});

myapp.use(app => {
  /* my functionality here */
});

myapp.listen(3000, () => console.log("MyBot is ready"));
```

This is the basic setup to run a slaq instance but this alone does nothing special except to prepare some core features like module interface and slack client instance.

For some main slack features you will want to use some of these other module packages:

### Modules

#### slaq-commands

```
yarn add slaq-commands
```

```js
myapp.use(require("slaq-commands"));
```

```js
// Match string equality
app.command("/foo", (req, res) => {
  // res.ack(...) === acknowledgement
  // makes the slack know that you received the event and already responds back
  res.ack("bar!");
});

// Match comparator function
app.command(
  cmd => cmd === "/foo",
  (req, res) => {
    res.ack("bar!");
  }
);

// Match regex
app.command(/\/(foo|bar)/, (req, res) => {
  res.ack("foobar!");
});

// Match multiple matchers
app.command(["/baz", /\/(foo|bar)/, cmd => cmd === "test"], (req, res) => {
  res.ack("foo!");
});

// Match all
app.command((req, res) => {
  res.ack("I respond to every unhandled commands");
});
```

#### slaq-events

```
yarn add slaq-events
```

```js
myapp.use(require("slaq-events"));
```

```js
// Match string equality
app.event("app_mention", (req, res) => {
  res.ack(); // events must be replied by a web method but still need an acknowledgement
  res.say("Called me?"); // res.say() is a wrapper that uses chat.postMessage web method
});

// Also works with all matchers as command
app.event(/regex/i, (req, res) => {});
app.event(ev => ev === "fn", (req, res) => {});
app.event([...matchers], (req, res) => {});
app.event((req, res) => {});
```

#### slaq-message

```
yarn add slaq-message
```

```js
myapp.use(require("slaq-events")); // message depends on events
myapp.use(require("slaq-message"));
```

```js
app.message(/(hi|hello)/i, (req, res) => {
  res.ack();
  res.say("Hello!");
});

// Also works with all matchers as command
app.message("string includes", (req, res) => {});
app.message(msg => msg === "fn", (req, res) => {});
app.message([...matchers], (req, res) => {});
app.message((req, res) => {});
```

### Example

```
yarn add slaq-commands slaq-events slaq-message
```

```js
const slaq = require("slaq");

const myapp = slaq({
  token: "YOUR-BOT-USER-OAUTH-TOKEN",
  signingSecret: "YOUR-BOT-SIGNING-SECRET"
});

myapp.use(require("slaq-commands")); // Handle slash commands at POST /commands
myapp.use(require("slaq-events")); // Handle events at POST /events
myapp.use(require("slaq-message")); // Handle message events

myapp.use(app => {
  // my app functionality goes here.
  // you may want to split in your own modules
  // using multiple myapp.use()

  app.command("/say-hello", (req, res) => {
    res.ack("Hello");
  });

  app.event("app_mention", (req, res) => {
    // `req.body` holds the slack payload sent to your app
    const { event } = req.body;
    res.ack();

    res.say({
      text: `Hello <@${event.user}>, what's up?`,
      thread_ts: event.ts // reply to message thread
    });
  });

  app.message("hey", (req, res) => {
    res.ack();
    res.say("hey :)");
  });
});

myapp.listen(process.env.PORT || 3000, () => console.log("MyBot is ready"));
```

> (!) Do not forget that you'll still need enable/update the endpoints and register the commands on your app's page at https://api.slack.com/apps

### Block Kit

```
yarn add slaq-block-kit
```

```js
const { Section, Context, Button, MdText } = require("slaq-block-kit");

const MyMessage = ({ by }) => [
  Section({
    text: "Compose beautiful messages with slack *block kit*!",
    accessory: Button({
      text: "See Slaq",
      url: "https://github.com/renatorib/slaq"
    })
  }),
  Context({
    elements: [MdText(`*Made by:* ${by}`)]
  })
];

// ...
res.say({
  blocks: MyMessage({ by: "slaq-block-kit" })
});
```

`MyMessage({ by: "slaq-block-kit" })` will "render" to this json:

```json
[
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "Compose beautiful messages with slack *block kit*!"
    },
    "accessory": {
      "type": "button",
      "text": {
        "type": "plain_text",
        "text": "See Slaq"
      },
      "url": "https://github.com/renatorib/slaq"
    }
  },
  {
    "type": "context",
    "elements": [
      {
        "type": "mrkdwn",
        "text": "*Made by:* slaq-block-kit"
      }
    ]
  }
]
```

## [WIP]

This project is still a wip, here are some features to be developed yet:

- [x] Module to handle commands
- [x] Module to handle events / event_callback
  - [x] Module to handle message events easily
- [ ] Module to handle interactive components (actions, dialogs, menus, etc)
- [ ] Module to simplify OAuth configuration
- [x] Block Kit components
  - [ ] Block Kit validator
  - [ ] JSX with htm?
- [ ] Better docs
- [ ] Tests
- [ ] Put commands/events/action as built-in modules?
- [x] Unify all endpoints in a single one

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="http://twitter.com/renatorib_"><img src="https://avatars2.githubusercontent.com/u/3277185?v=4" width="70px;" alt="Renato Ribeiro"/><br /><sub><b>Renato Ribeiro</b></sub></a><br /></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
