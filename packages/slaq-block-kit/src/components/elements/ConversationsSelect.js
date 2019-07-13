const PlainText = require("./PlainText");
const Confirm = require("../objects/Confirm");

/**
 * !type: 'conversations_select'
 * action_id: string
 * placeholder: elements.plain_text
 * confirm: objects.confirm
 * initial_conversation: string
 */

const ConversationsSelect = ({
  id,
  placeholder,
  confirm,
  initial_conversation
}) => ({
  type: "conversations_select",
  action_id: id,
  placeholder:
    typeof placeholder === "string" ? PlainText(placeholder) : placeholder,
  confirm: typeof confirm === "string" ? Confirm(confirm) : confirm,
  initial_conversation
});

module.exports = ConversationsSelect;
