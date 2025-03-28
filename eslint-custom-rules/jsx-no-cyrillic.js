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
                function hasCyrillic(text) {
                    const pattern = /[а-яА-ЯёЁ]/;
                    return pattern.test(text);
                }

                return {
                    JSXText(node) {
                        const text = node.value.trim();
                        if (hasCyrillic(text)) {
                            context.report({
                                node,
                                message: 'The use of Cyrillic alphabet in React components is prohibited.'
                            });
                        }
                    },
                    Literal(node) {
                        if (node.parent.type === 'JSXAttribute' && typeof node.value === 'string') {
                            if (hasCyrillic(node.value)) {
                                context.report({
                                    node,
                                    message: 'The use of Cyrillic alphabet in Props of React components is prohibited.'
                                });
                            }
                        }
                    },
                    JSXExpressionContainer(node) {
                        if (node.expression.type === 'Literal' && typeof node.expression.value === 'string') {
                            if (hasCyrillic(node.expression.value)) {
                                context.report({
                                    node,
                                    message: 'The use of Cyrillic alphabet in React expressions is prohibited.'
                                });
                            }
                        }
                    }
                };
            },
        },
    },
};