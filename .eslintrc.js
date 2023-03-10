// See: https://eslint.org/docs/user-guide/configuring/configuration-files
module.exports = {
  extends: ["eslint:recommended", "prettier"],
  plugins: ["prettier"],
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: false,
    ecmaVersion: 2022,
    sourceType: "module",
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    commonjs: true,
    jquery: true,
  },
  globals: {
    __webpack_public_path__: true,
    Shopify: true,
  },
  /**
   * add custom rules
   * docs: https://eslint.org/docs/rules
   */
  rules: {
    "prettier/prettier": 0,
  },
  overrides: [],
  /**
   * ignore certain files
   * docs: https://eslint.org/docs/user-guide/configuring#ignorepatterns-in-config-files
   */
};
