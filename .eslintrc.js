module.exports = {
  root: true,
  extends: "@react-native-community",
  rules: {
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".js", ".jsx"]
      }
    ],
    "prettier/prettier": [
      "error",
      {
        trailingComma: "es5",
        singleQuote: true,
        printWidth: 100
      }
    ],
    "comma-dangle": 0,
    semi: 0
  },
  plugins: ["prettier"]
};
