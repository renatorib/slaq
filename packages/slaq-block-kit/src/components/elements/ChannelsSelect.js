const PlainText = require("./PlainText");
const Confirm = require("../objects/Confirm");

/**
 * !type: 'channels_select'
 * action_id: string
 * placeholder: elements.plain_text
 * confirm: objects.confirm
 * initial_channel: string
 */

const ChannelsSelect = ({ id, placeholder, confirm, initial_channel }) => ({
  type: "channels_select",
  action_id: id,
  placeholder:
    typeof placeholder === "string" ? PlainText(placeholder) : placeholder,
  confirm: typeof confirm === "string" ? Confirm(confirm) : confirm,
  initial_channel
});

module.exports = ChannelsSelect;
