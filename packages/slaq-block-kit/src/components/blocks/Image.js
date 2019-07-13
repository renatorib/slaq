const PlainText = require("../elements/PlainText");

/**
 * !type: 'image'
 * !image_url: string
 * !alt_text: string
 * block_id: string
 * title: elements.plain_text
 */

const Image = ({ id, src, alt, title }) => ({
  type: "image",
  block_id: id,
  image_url: src,
  alt_text: alt,
  title: typeof title === "string" ? PlainText(title) : title
});

module.exports = Image;
