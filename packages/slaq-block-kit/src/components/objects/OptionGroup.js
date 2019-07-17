const Option = require("../elements/PlainText");

/**
 * !label: elements.plain_text
 * !options: arrayOf(objects.option)
 */

const OptionGroup = ({ label, options }) => ({
  label,
  options: options.map(Option)
});

module.exports = OptionGroup;
