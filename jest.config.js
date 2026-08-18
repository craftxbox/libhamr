/** @type {import("jest").Config} */
export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { useESM: true }],
  },
  moduleNameMapper: {
    "^@ha\\.mr/(.*)$": "<rootDir>/ha.mr/docs/$1",
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  testMatch: [
    "**/?(*.)+(spec|test).[jt]s?(x)",
    "**/?(*.)+(spec|test).mjs",
  ],
};