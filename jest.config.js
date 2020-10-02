module.exports = {
  roots: ["<rootDir>/packages"],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts$",
  moduleFileExtensions: ["ts", "js", "json", "node"]
};
