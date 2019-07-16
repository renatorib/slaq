const MdText = require("./MdText");
const Confirm = require("../objects/Confirm");

/**
 * !type: 'button'
 * !text: oneOfType(elements.plain_text, elements.mrkdwn)
 * action_id: string
 * confirm: objects.confirm
 * url: string.range(1, 3000)
 * value: string.range(1, 75)
 * style: 'primary' | 'danger'
 */

const ALLOWED_STYLES = ["primary", "danger"];

const Button = props => {
  if (typeof props === "string") {
    return {
      type: "button",
      text: MdText(props)
    };
  }

  const { id, text, confirm, url, value, style } = props;

  return {
    type: "button",
    action_id: id,
    text: typeof text === "string" ? MdText(text) : text,
    confirm: typeof confirm === "string" ? Confirm(confirm) : confirm,
    url: url ? url.slice(0, 3000) : undefined,
    value: value ? value.slice(0, 75) : undefined,
    style: ALLOWED_STYLES.includes(style) ? style : undefined
  };
};

module.exports = Button;
