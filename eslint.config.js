import eslint from "eslint";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    files: ["**/*.js", "**/*.ts"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
    },
    plugins: {
      prettier,
    },
    rules: {
      ...prettierConfig.rules,
      "no-console": "warn",
      "no-unused-vars": "warn",
    },
  },
];
