module.exports = {
  extends: ["eslint:recommended", "prettier"], // extending recommended config and config derived from eslint-config-prettier
  plugins: ["prettier", "react-hooks", "react"], // activating esling-plugin-prettier (--fix stuff)
  parser: "babel-eslint",
  rules: {
    "no-unused-vars": "off",
    "no-undef": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "prettier/prettier": [
      // customizing prettier rules (unfortunately not many of them are customizable)
      "error",
      {
        singleQuote: true,
        tabWidth: 4,
        semi:true,
        jsxSingleQuote:true,
        bracketSpacing: true,

        trailingComma: "all"
      }
    ],
    eqeqeq: ["error", "always"] // adding some custom ESLint rules
  }
};
