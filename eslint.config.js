import eslintJs from "@eslint/js";
import globals from "globals";
import eslintTs from "typescript-eslint";

export default [
  {
    ignores: [],
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  eslintJs.configs.recommended,
  ...eslintTs.configs.recommended,
  {
    files: ["**/*.jsx"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    rules: {
      "no-constant-binary-expression": 1,
      "@typescript-eslint/ban-types": [2, { types: { Function: false } }],
      "@typescript-eslint/no-unused-vars": [
        1,
        { args: "after-used", ignoreRestSiblings: true },
      ],
    },
  },
];
