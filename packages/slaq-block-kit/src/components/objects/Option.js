const PlainText = require("../elements/PlainText");

/**
 * !text: elements.plain_text
 * description: elements.plain_text
 * value: string.range(1, 75)
 */

const Option = ({ text, value, description }) => ({
  text: typeof text === "string" ? PlainText(text) : text,
  value: typeof value === "string" ? PlainText(value) : value,
  description:
    typeof description === "string" ? PlainText(description) : description
});

module.exports = Option;
