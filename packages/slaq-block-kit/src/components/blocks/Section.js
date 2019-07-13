/**
 * !type: 'section'
 * block_id: string
 * text: oneOfType(
 *   elements.plain_text
 *   elements.mrkdwn
 * )
 * accessory: oneOfType(
 *   elements.static_select
 *   elements.users_select
 *   elements.conversations_select
 *   elements.channels_select
 *   elements.button
 *   elements.overflow
 *   elements.datepicker
 *   elements.image
 * )
 * fields: arrayOf(oneOfType(
 *   elements.plain_text
 *   elements.mrkdwn
 * ))
 */

const ALLOWED_ACCESSORY = [
  "static_select",
  "users_select",
  "conversations_select",
  "channels_select",
  "button",
  "overflow",
  "datepicker",
  "image"
];

const ALLOWED_FIELDS = ["plain_text", "mrkdwn"];

const Section = ({ id, text, accessory, fields }) => ({
  type: "section",
  block_id: id,
  text,
  accessory:
    accessory && ALLOWED_ACCESSORY.includes(accessory.type)
      ? accessory
      : undefined,
  fields: Array.isArray(fields)
    ? fields.filter(field => ALLOWED_FIELDS.includes(field.type))
    : fields
});

module.exports = Section;
