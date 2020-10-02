import WILDCARD from "./wildcard";
import { match } from "./match";

describe("slaq-utils > matcher > match", () => {
  it("should match wildcard", () => {
    expect(match(WILDCARD, "anything")).toBeTruthy();
    expect(match(WILDCARD, "really anything")).toBeTruthy();
  });

  it("should match string", () => {
    expect(match("foo", "foo")).toBeTruthy();
    expect(match("foo", "fooo")).toBeFalsy();
    expect(match("fooo", "fooo")).toBeTruthy();
    expect(match("fooo", "foo")).toBeFalsy();
  });

  it("should match regex", () => {
    expect(match(/foo/, "foo")).toBeTruthy();
    expect(match(/foo/, "foO")).toBeFalsy();
    expect(match(/foo/i, "foO")).toBeTruthy();
    expect(match(/^foo$/, "foo message")).toBeFalsy();
    expect(match(/^foo/, "foo message")).toBeTruthy();
    expect(match(/([A-Z]{1,4}-[0-9]{1,4})/i, "text message")).toBeFalsy();
    expect(match(/([A-Z]{1,4}-[0-9]{1,4})/i, "text code-123")).toBeTruthy();
  });

  it("should match function comparator", () => {
    const isLongText = text => text.length > 5;
    expect(match(isLongText, "foo")).toBeFalsy();
    expect(match(isLongText, "a long text")).toBeTruthy();
  });

  it("should match array", () => {
    const fiveChars = text => text.length === 5;
    expect(match([fiveChars, "bar", /foo/i], "a random text")).toBeFalsy();
    expect(match([fiveChars, WILDCARD], "a random text")).toBeTruthy();
    expect(match([fiveChars, "bar", /foo/i], "foo")).toBeTruthy();
    expect(match([fiveChars, "bar", /foo/i], "bar")).toBeTruthy();
    expect(match([fiveChars, "bar", /foo/i], "five!")).toBeTruthy();
  });
});
