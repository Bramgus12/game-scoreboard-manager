module.exports = {
  env: {
      browser: true,
      node: true,
      jest: true,
      es6: true
  },
  extends: [
      "plugin:@tanstack/eslint-plugin-query/recommended",
      "eslint:recommended",
      "plugin:react-hooks/recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:@typescript-eslint/recommended-requiring-type-checking",
      "plugin:react/recommended",
      "plugin:react/jsx-runtime",
      "plugin:import/recommended",
      "plugin:import/typescript",
      "prettier",
  ],
  plugins: ["prettier", "react", "@typescript-eslint", "eslint-plugin-react-compiler"],
  parser: "@typescript-eslint/parser",
  root: true,
  parserOptions: {
      ecmaVersion: 6,
      sourceType: "module",
      ecmaFeatures: {
          jsx: true
      },
      project: "./tsconfig.json",
  },
  overrides: [
      {
          "files": ["src/components/**"],
          "rules": {
              "react/jsx-props-no-spreading": "off"
          }
      }
  ],
  rules: {
      // prettier
      "prettier/prettier": "error",

      "react-compiler/react-compiler": "warn",

      // eslint
      "no-console": ["warn", { allow: ["error", "info"] }],
      "func-names": "off",
      "no-process-exit": "off",
      "object-shorthand": "off",
      "class-methods-use-this": "off",
      "max-len": [
          "error",
          {
              "code": 150
          }
      ],

      // @typescript
      "@typescript-eslint/indent": "off",
      "@typescript-eslint/semi": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/naming-convention": "off",
      "@typescript-eslint/strict-boolean-expressions": "error",
      "@typescript-eslint/no-misused-promises": [
          "error",
          { "checksVoidReturn": false }
      ],
      "@typescript-eslint/no-unbound-method": "off",

      //react
      "react/react-in-jsx-scope": 0,
      "react/jsx-no-bind": 0,
      "react-hooks/exhaustive-deps": 2,
      "react/jsx-filename-extension": 0,
      "react/require-default-props": 0,
      "react/prop-types": [
          2,
          {
              "skipUndeclared": true
          }
      ],

      // plugin:import/recommended
      "import/prefer-default-export": 0,
      "import/no-extraneous-dependencies": 0,
      "react/jsx-props-no-spreading": 0,
      "no-restricted-exports": 0,
      "no-param-reassign": [
          "error",
          {
              "props": true,
              "ignorePropertyModificationsForRegex": ["^immer"]
          }
      ]
  },
  ignorePatterns: [".eslintrc.cjs", "**.config.ts", "**.config.mjs", "dist/*"],
  settings: {
      react: {
          version: "detect"
      },
      jsdoc: {
          mode: "typescript"
      },
      "import/resolver": {
          node: {
              paths: [
                  "src"
              ]
          }
      }
  }
}
