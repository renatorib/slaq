const PlainText = require("../elements/PlainText");

/**
 * confirm: elements.plain_text,
 * deny: elements.plain_text,
 * text: elements.plain_text,
 * title: elements.plain_text
 */

const Confirm = props => {
  let text, confirm, deny, title;

  if (typeof props === "string") {
    text = props;
  }

  if (typeof props === "object") {
    confirm = props.confirm;
    deny = props.deny;
    text = props.text;
    title = props.title;
  }

  return {
    confirm: confirm ? PlainText(confirm) : undefined,
    deny: deny ? PlainText(deny) : undefined,
    text: text ? PlainText(text) : undefined,
    title: title ? PlainText(title) : undefined
  };
};

module.exports = Confirm;
