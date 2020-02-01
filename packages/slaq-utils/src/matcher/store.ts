import WILDCARD from "./wildcard";
import match, { Matcher } from "./match";

export type Handler = (...args: any[]) => any;

type MatcherStoreProps = {
  defaultHandler?: (...args: any[]) => any;
  onDispatch?: ([matcher, handler]: [Matcher, Handler], [...any]) => any;
  onSet?: ([matcher, handler]: [Matcher, Handler]) => any;
};

const matcherStore = ({
  defaultHandler = () => {},
  onDispatch = () => {},
  onSet = () => {}
}: MatcherStoreProps = {}) => {
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

  const setter = (matcher: Matcher, handler) => {
    if (typeof matcher === "function" && !handler) {
      handler = matcher;
      matcher = WILDCARD;
    }

    onSet([matcher, handler]);
    return state.push([matcher, handler]);
  };

  return Object.assign(setter, {
    dispatch,
    state
  });
};

export default matcherStore;

// backwards compat
module.exports = matcherStore;
