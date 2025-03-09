module.exports = {
    rules: {
        "jsx-no-cyrillic": {
            meta: {
                type: "problem",
                docs: {
                    description: "Prohibit the use of Cyrillic alphabet in React components",
                },
                schema: [],
            },
            create(context) {
                return {
                    JSXText(node) {
                        const text = node.value.trim();
                        const pattern = /[а-яА-ЯёЁ]/;
                        if (pattern.test(text)) {
                            context.report({
                                node,
                                message: 'The use of Cyrillic alphabet in React components is prohibited.'
                            })
                        }
                    }
                }
            },
        },
    },
}