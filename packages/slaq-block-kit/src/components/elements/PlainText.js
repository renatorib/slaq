/**
 * !type: string.equal('plain_text')
 * !text: string.range(1, 3000)
 * emoji: boolean
 */

const PlainText = props => {
  let text,
    emoji = true;

  if (typeof props === "string") {
    text = props;
  }

  if (typeof props === "object") {
    text = props.text;
    emoji = props.emoji;
  }

  return {
    type: "plain_text",
    text,
    emoji
  };
};

module.exports = PlainText;
