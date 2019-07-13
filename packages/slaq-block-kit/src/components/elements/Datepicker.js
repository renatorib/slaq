const PlainText = require("./PlainText");
const Confirm = require("../objects/Confirm");

/**
 * !type: 'datepicker'
 * action_id: string
 * placeholder: elements.plain_text
 * confirm: objects.confirm
 * initial_date: string
 */

const Datepicker = ({ id, placeholder, confirm, initial_date }) => ({
  type: "datepicker",
  action_id: id,
  placeholder:
    typeof placeholder === "string" ? PlainText(placeholder) : placeholder,
  confirm: typeof confirm === "string" ? Confirm(confirm) : confirm,
  initial_date
});

module.exports = Datepicker;
