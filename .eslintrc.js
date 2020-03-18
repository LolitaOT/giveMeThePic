module.exports = {
    "env": {
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "strict": ["error", "global"],
        "no-multi-spaces": "error",
        "block-spacing": "error",
        "comma-spacing": ["error", { "before": false, "after": true }],
        "array-bracket-spacing": ["error", "always"],
        "func-call-spacing": ["error", "never"],
        "no-trailing-spaces": "error",
        "quote-props": ["error", "as-needed", { "keywords": true, "numbers": true }],
        "quotes": ["error", "single"],
        "object-curly-spacing": ["error", "always"],
        "space-before-blocks": "error",
        "space-before-function-paren": ["error", "always"],
        "space-in-parens": ["error", "never"],
        "arrow-spacing":"error",
        "rest-spread-spacing": ["error", "never"],
        "template-curly-spacing": ["error", "never"],
        "eol-last": ["error", "always"]
    }
};