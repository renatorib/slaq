import { parseArgs } from "./parseArgs";

describe("slaq-utils > parseArgs > parseArgs", () => {
  it("should parse arguments from a string", () => {
    const args = parseArgs("foo bar team:2 limit:5000");

    expect(args).toEqual({
      team: "2",
      limit: "5000"
    });
  });

  it("should parse arguments from a string and parse it", () => {
    const args = parseArgs("foo bar team:2 offset:2.30", {
      team: Number,
      offset: parseFloat
    });

    expect(args).toEqual({
      team: 2,
      offset: 2.3
    });
  });
});
