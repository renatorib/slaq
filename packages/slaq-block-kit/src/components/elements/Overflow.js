const Confirm = require("../objects/Confirm");

/**
 * !type: 'overflow'
 * action_id: string
 * confirm: objects.confirm
 * options: arrayOf(objects.option_btn)
 */

const Overflow = ({ id, confirm, options }) => ({
  type: "overflow",
  action_id: id,
  confirm: typeof confirm === "string" ? Confirm(confirm) : confirm,
  options
});

module.exports = Overflow;
