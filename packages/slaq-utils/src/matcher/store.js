const WILDCARD = require("./wildcard");
const match = require("./match");

const matcherStore = ({
  defaultHandler = () => {},
  onDispatch = () => {}
} = {}) => {
  const state = [];

  const dispatch = payload => {
    const defaults = [null, defaultHandler];
    const [matcher, handler] =
      state.find(([matcher]) => match(matcher, payload)) || defaults;

    return (...args) => {
      onDispatch([matcher, handler], [...args]);
      handler(...args);
    };
  };

  const setter = (matcher, handler) => {
    if (typeof matcher === "function" && !handler) {
      handler = matcher;
      matcher = WILDCARD;
    }

    return state.push([matcher, handler]);
  };

  return Object.assign(setter, {
    dispatch
  });
};

module.exports = matcherStore;
