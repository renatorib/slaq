const Option = require("./Option");
/**
 * extends objects.option
 * url: string
 */

const OptionBtn = ({ url, ...props }) => ({
  ...Option(props),
  url
});

module.exports = OptionBtn;
