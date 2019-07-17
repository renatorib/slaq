const WILDCARD = require("./wildcard");

const isString = value => typeof value === "string";
const isSymbol = value => typeof value === "symbol";
const isFunction = value => typeof value === "function";
const isRegex = value => value instanceof RegExp;
const isArray = value => Array.isArray(value);

const match = (matcher, payload) => {
  if (isSymbol(matcher)) {
    return matcher === WILDCARD;
  }

  if (isString(matcher)) {
    return matcher === payload;
  }

  if (isRegex(matcher)) {
    return matcher.test(payload);
  }

  if (isFunction(matcher)) {
    return !!matcher(payload);
  }

  if (isArray(matcher)) {
    return matcher.find(child => match(child, payload));
  }

  return false;
};

module.exports = match;
