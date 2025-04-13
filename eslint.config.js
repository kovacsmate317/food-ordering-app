// eslint.config.cjs
const parser = require("@typescript-eslint/parser");
const eslintPluginTs = require("@typescript-eslint/eslint-plugin");

module.exports = [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
        ecmaVersion: "latest",
      },
    },
    plugins: {
      "@typescript-eslint": eslintPluginTs,
    },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "single"],
      "@typescript-eslint/no-unused-vars": ["warn"],
    },
  },
];
