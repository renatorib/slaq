import WILDCARD from "./wildcard";
import { match, Matcher } from "./match";

export type Handler = (...args: any[]) => any;

type MatcherStoreProps = {
  defaultHandler?: (...args: any[]) => any;
  onDispatch?: ([matcher, handler]: [Matcher, Handler], [...any]) => any;
  onSet?: ([matcher, handler]: [Matcher, Handler]) => any;
};

export const matcherStore = ({
  defaultHandler = () => {},
  onDispatch = () => {},
  onSet = () => {}
}: MatcherStoreProps = {}) => {
  const state: [Matcher, Handler][] = [];

  const dispatch = (payload: string) => {
    const defaults = [null, defaultHandler];
    const [matcher, handler] =
      state.find(([matcher]) => match(matcher, payload)) || defaults;

    return (...args: any) => {
      onDispatch([matcher, handler], [...args]);
      handler(...args);
    };
  };

  function setter(handler: Handler): void;
  function setter(matcher: Matcher, handler: Handler): void;
  function setter(matcher: Matcher | Handler, handler?: Handler): void {
    const isWildcard = typeof matcher === "function" && !handler;

    const _matcher = isWildcard ? WILDCARD : matcher;
    const _handler = isWildcard ? (matcher as Handler) : handler;

    onSet([_matcher, _handler]);
    state.push([_matcher, _handler]);
  }

  return Object.assign(setter, {
    dispatch,
    state
  });
};
