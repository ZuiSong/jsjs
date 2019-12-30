module.exports = {
    parser: '@typescript-eslint/parser',
    "parserOptions": {
        "ecmaVersion": 6,//也就是ES6语法支持的意思
        "sourceType": "module",
        "ecmaFeatures": {
            "modules": true
        },
        "project": "./tsconfig.json"
    },

    plugins: ['@typescript-eslint'],
    rules: {
        //强制使用单引号
        quotes: ["error", "single"],
        //强制不使用分号结尾
        semi: ["error", "never"],
        // 禁止使用 var
        'no-var': "error",
        // 优先使用 interface 而不是 type
        '@typescript-eslint/consistent-type-definitions': [
            "error",
            "interface"
        ]
    }
}