// @TODO: build a validator over blocks

class BlockKitValidationError extends Error {
  constructor(message) {
    super(`BlockKitValidationError: ${message}`);
    this.name = "BlockKitValidationError";
  }
}

const invalidate = message => {
  throw new BlockKitValidationError(message);
};

const validate = async blocks => {
  if (!Array.isArray(blocks)) {
    invalidate("`blocks` must be an array");
  }

  return true;
};

module.exports = validate;
