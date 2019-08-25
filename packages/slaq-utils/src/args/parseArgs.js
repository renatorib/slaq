const parseArgs = (string, schema = {}) => {
  return string.match(/[^:\s]+:[^:\s]+/gi).reduce((acc, matched) => {
    const [name, value] = matched.split(":");
    const parsedValue =
      schema[name] && typeof schema[name] === "function"
        ? schema[name](value)
        : value;

    return { ...acc, [name]: parsedValue };
  }, {});
};

exports.parseArgs = parseArgs;
