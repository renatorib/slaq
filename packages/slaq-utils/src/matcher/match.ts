import WILDCARD from "./wildcard";

export type MatcherType = string | symbol | Function | RegExp;
export type Matcher = MatcherType | MatcherType[];

const isString = (value: Matcher) => typeof value === "string";
const isSymbol = (value: Matcher) => typeof value === "symbol";
const isFunction = (value: Matcher) => typeof value === "function";
const isRegex = (value: Matcher) => value instanceof RegExp;
const isArray = (value: Matcher) => Array.isArray(value);

const match = (matcher: Matcher, payload: any): boolean => {
  if (isSymbol(matcher)) {
    return matcher === WILDCARD;
  }

  if (isString(matcher)) {
    return matcher === payload;
  }

  if (isRegex(matcher)) {
    return (matcher as RegExp).test(payload);
  }

  if (isFunction(matcher)) {
    return !!(matcher as Function)(payload);
  }

  if (isArray(matcher)) {
    return Boolean(
      (matcher as MatcherType[]).find(child => match(child, payload))
    );
  }

  return false;
};

export default match;

// backwards compat
module.exports = match;
