const PlainText = require("./PlainText");
const Confirm = require("../objects/Confirm");

/**
 * !type: 'static_select'
 * options: arrayOf(objects.option)
 * option_groups: arrayOf(shape(
 *   label: elements.plain_text
 *   options: arrayOf(objects.option)
 * ))
 * action_id: string
 * placeholder: elements.plain_text
 * confirm: elements._confirm
 * initial_option: objects.option
 */

const StaticSelect = ({
  id,
  options,
  option_groups,
  placeholder,
  confirm,
  initial_option
}) => ({
  type: "static_select",
  action_id: id,
  options,
  option_groups,
  placeholder:
    typeof placeholder === "string" ? PlainText(placeholder) : placeholder,
  confirm: typeof confirm === "string" ? Confirm(confirm) : confirm,
  initial_option
});

module.exports = StaticSelect;
