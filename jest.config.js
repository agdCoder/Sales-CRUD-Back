module.exports = {
  testEnvironment: "node",
  testRegex: "/tests/.*\\.test\\.ts$",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
