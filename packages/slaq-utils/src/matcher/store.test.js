const matcherStore = require("./store");

describe("slaq-utils > matcher > store", () => {
  it("should dispatch matched handler", () => {
    const defaultHandler = jest.fn();
    const store = matcherStore({ defaultHandler });
    const shouldCall = jest.fn();

    store(/foo/, shouldCall);
    store.dispatch("foo")();

    expect(defaultHandler.mock.calls.length).toBe(0);
    expect(shouldCall.mock.calls.length).toBe(1);
  });

  it("should dispatch defaultHandler if not match", () => {
    const defaultHandler = jest.fn();
    const store = matcherStore({ defaultHandler });
    const shouldNotCall = jest.fn();

    store(/notmatch/, shouldNotCall);
    store.dispatch("foo")();

    expect(defaultHandler.mock.calls.length).toBe(1);
    expect(shouldNotCall.mock.calls.length).toBe(0);
  });

  it("should dispatch only first handler match", () => {
    const store = matcherStore();
    const shouldCall = jest.fn();
    const shouldNotCall = jest.fn();

    store(/foo/, shouldCall);
    store(/foo/, shouldNotCall);
    store.dispatch("foo")();

    expect(shouldCall.mock.calls.length).toBe(1);
    expect(shouldNotCall.mock.calls.length).toBe(0);
  });

  it("should set wilcard if setter has only one argument", () => {
    const store = matcherStore();
    const shouldCall = jest.fn();
    const shouldNotCall = jest.fn();

    store(shouldCall);
    store(shouldNotCall);
    store.dispatch("anything")();

    expect(shouldCall.mock.calls.length).toBe(1);
    expect(shouldNotCall.mock.calls.length).toBe(0);
  });
});
