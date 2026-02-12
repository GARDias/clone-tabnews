const nextJest = require("next/jest");
const createJestConfig = nextJest();
const dotenv = require("dotenv");
dotenv.config({ path: ["./.env.development"] });
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
});

module.exports = jestConfig;
