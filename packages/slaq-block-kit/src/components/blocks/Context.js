/**
 * !type: 'context'
 * !elements: arrayOf(oneOfType(
 *   elements.image
 *   elements.plain_text
 *   elements.mrkdwn
 * ))
 * block_id: string
 */

const ALLOWED_ELEMENTS = ["image", "plain_text", "mrkdwn"];

const Context = ({ id, elements }) => ({
  type: "context",
  block_id: id,
  elements: Array.isArray(elements)
    ? elements.filter(element => ALLOWED_ELEMENTS.includes(element.type))
    : []
});

module.exports = Context;
