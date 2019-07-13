/**
 * !type: 'actions'
 * !elements: arrayOf(oneOfType(
 *   elements.static_select
 *   elements.users_select
 *   elements.conversations_select
 *   elements.channels_select
 *   elements.button
 *   elements.overflow
 *   elements.datepicker
 * )).range(1, 25)
 * block_id: string
 */

const ALLOWED_ELEMENTS = [
  "static_select",
  "users_select",
  "conversations_select",
  "channels_select",
  "button",
  "overflow",
  "datepicker"
];

const Actions = ({ id, elements }) => ({
  type: "divider",
  block_id: id,
  elements: Array.isArray(elements)
    ? elements.filter(element => ALLOWED_ELEMENTS.includes(element.type))
    : []
});

module.exports = Actions;
