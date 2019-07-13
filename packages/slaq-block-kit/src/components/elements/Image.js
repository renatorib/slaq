/**
 * !type: 'image'
 * !image_url: string
 * !alt_text: string
 */

const Image = ({ src, alt }) => ({
  type: "image",
  image_url: src,
  alt_text: alt
});

module.exports = Image;
