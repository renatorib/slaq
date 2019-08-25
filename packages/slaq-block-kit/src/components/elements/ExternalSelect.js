const PlainText = require("./PlainText");
const Confirm = require("../objects/Confirm");

/**
 * !type: 'external_select'
 * action_id: string
 * placeholder: elements.plain_text
 * confirm: objects.confirm
 * initial_user: string
 */

const ExternalSelect = ({
  id,
  placeholder,
  confirm,
  initial_option,
  min_query_length
}) => ({
  type: "external_select",
  action_id: id,
  placeholder:
    typeof placeholder === "string" ? PlainText(placeholder) : placeholder,
  confirm: typeof confirm === "string" ? Confirm(confirm) : confirm,
  initial_option,
  min_query_length
});

module.exports = ExternalSelect;
