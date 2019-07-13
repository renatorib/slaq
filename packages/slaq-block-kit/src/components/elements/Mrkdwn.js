/**
 * !type: 'mrkdwn'
 * !text: string
 */

const Mrkdwn = props => {
  let text;

  if (typeof props === "string") {
    text = props;
  }

  if (typeof props === "object") {
    text = props.text;
  }

  return {
    type: "mrkdwn",
    text
  };
};

module.exports = Mrkdwn;
