const PlainText = require("./PlainText");
const Confirm = require("../objects/Confirm");

/**
 * !type: 'users_select'
 * action_id: string
 * placeholder: elements.plain_text
 * confirm: objects.confirm
 * initial_user: string
 */

const UsersSelect = ({ id, placeholder, confirm, initial_user }) => ({
  type: "users_select",
  action_id: id,
  placeholder:
    typeof placeholder === "string" ? PlainText(placeholder) : placeholder,
  confirm: typeof confirm === "string" ? Confirm(confirm) : confirm,
  initial_user
});

module.exports = UsersSelect;
