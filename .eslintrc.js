// same lint from essentials, but without JSX
module.exports = {
  extends: ["airbnb/base", "prettier"],
  parserOptions: {
    ecmaVersion: 10,
  },
  rules: {
    "comma-dangle": ["error", "never"],
    "no-plusplus": "off",
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "no-use-before-define": ["error", { functions: false }],
    "no-unused-expressions": [
      "error",
      { allowShortCircuit: true, allowTernary: true }
    ],
    "consistent-return": "off",
    "no-console": "off",
    "no-await-in-loop": "off",
    "no-param-reassign": "off",
    "no-underscore-dangle": "off",
    "no-return-assign": "off",
    "class-methods-use-this": "off"
  },
  globals: {
    request: true,
    app: true,
    rootRequire: true
  },
  env: {
    es6: true
  }
}
