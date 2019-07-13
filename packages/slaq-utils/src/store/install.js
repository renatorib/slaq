const installStoreHandlers = ({
  array = true,
  regex = true,
  func = true,
  string = "contains",
  defaultHandler = (_, res) => res.sendStatus(200)
} = {}) => {
  const store = new Map();

  const dispatch = compare => {
    let handler;
    const def = fn => {
      if (!handler) {
        handler = fn;
      }
    };

    store.forEach((fn, key) => {
      function check(v) {
        // Handle regex type
        if (v instanceof RegExp && !!regex) {
          if (v.test(text)) def(fn);
        }
        // Handle string type
        if (typeof v === "string" && !!string) {
          if (string === "contains" && v.includes(compare)) def(fn);
          if (string === "equals" && v === compare) def(fn);
        }
        // Handle function type
        if (typeof v === "function" && !!func) {
          if (v(compare)) def(fn);
        }
        // Handle array of any previous types
        if (Array.isArray(v) && !!array) {
          k.forEach(value => check(value));
        }
      }

      check(key);
    });

    def(defaultHandler);

    return (...args) => handler(...args);
  };

  function setter(compare, handler) {
    store.set(compare, handler);
  }

  setter.dispatch = dispatch;
  setter.store = store;

  return setter;
};

module.exports = installStoreHandlers;
