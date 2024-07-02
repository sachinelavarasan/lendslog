module.exports = {
  root: true,
  extends: [
    'expo', 'prettier'
  ],
  ignorePatterns: [
    "**/*/*.js",
    "*.js",
    "*.svg",
    "*.json",
    "*.png",
    "node_modules/**",
    "package.json",
    "package-lock.json",
  ],
  parser: "@typescript-eslint/parser",
  plugins: [
    prettier
  ],
  env: {
    browser: true,
    node: true,
    es2021: true,
    "react-native/react-native": true,
  },
  rules: {
    quotes: [
      "error",
      "double",
      {
        avoidEscape: true,
      },
    ],
    "max-len": ["error", 150],
    "@typescript-eslint/ban-ts-comment": 2,
    "@typescript-eslint/no-explicit-any": 1,
    "react-native/no-unused-styles": 2,
    "react-native/no-inline-styles": 1,
    "@typescript-eslint/no-empty-interface": 1,
    "react-hooks/rules-of-hooks": 2,
    "react-hooks/exhaustive-deps": 0,
    "prefer-destructuring": 2,
    "no-nested-ternary": 2,
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "import/no-unused-modules": "error",
  },
};