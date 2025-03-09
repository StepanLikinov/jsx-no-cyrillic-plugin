const react = require('eslint-plugin-react');
const jsxNoCyrillic = require("./eslint-custom-rules/jsx-no-cyrillic");

module.exports = [
    {
        files: ["**/*.jsx"],
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                  jsx: true,
                },
            },
        },
        plugins: {"eslint-custom-rules": jsxNoCyrillic},
        rules: {
            "eslint-custom-rules/jsx-no-cyrillic": "error",
        },
    }
]