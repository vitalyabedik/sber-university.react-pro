import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import boundaries from "eslint-plugin-boundaries";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";

export default [
  {
    ignores: ["dist/**", "node_modules/**", "eslint.config.js", "vite.config.ts"],
  },

  js.configs.recommended,
  prettier,

  {
    files: ["**/*.{js,jsx,ts,tsx}"],

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: "module",
      parserOptions: {
        project: "./tsconfig.app.json",
      },
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      import: importPlugin,
      boundaries,
    },

    settings: {
      react: {
        version: "detect",
      },

      "import/resolver": {
        typescript: {
          project: "./tsconfig.app.json",
        },
      },

      "boundaries/elements": [
        { type: "shared", pattern: "src/shared/*" },
        { type: "entities", pattern: "src/entities/*" },
        { type: "features", pattern: "src/features/*" },
        { type: "widgets", pattern: "src/widgets/*" },
        { type: "pages", pattern: "src/pages/*" },
        { type: "app", pattern: "src/app/*" },
      ],
    },

    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,

      "react/react-in-jsx-scope": "off",
      "no-undef": "off",
      "no-unused-vars": "off",
      "no-redeclare": "off",
      "react/display-name": "off",
      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",

          policies: [
            {
              from: { element: { type: "features" } },
              allow: [
                { to: { element: { type: "shared" } } },
                { to: { element: { type: "entities" } } },
              ],
            },
            {
              from: { element: { type: "entities" } },
              allow: [{ to: { element: { type: "shared" } } }],
            },
            {
              from: { element: { type: "widgets" } },
              allow: [
                { to: { element: { type: "shared" } } },
                { to: { element: { type: "features" } } },
                { to: { element: { type: "entities" } } },
              ],
            },
            {
              from: { element: { type: "pages" } },
              allow: [
                { to: { element: { type: "widgets" } } },
                { to: { element: { type: "features" } } },
                { to: { element: { type: "entities" } } },
                { to: { element: { type: "shared" } } },
              ],
            },
          ],
        },
      ],
    },
  },
];
