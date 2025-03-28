const { RuleTester } = require('eslint');
const path = require('path');
const fs = require('fs');
const rule = require('../eslint-custom-rules/jsx-no-cyrillic').rules['jsx-no-cyrillic'];

const ruleTester = new RuleTester({
    languageOptions: {
        ecmaVersion: 'latest',
        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
    },
});

function getFixtureCode(name) {
    return fs.readFileSync(path.join(__dirname, 'fixtures', `${name}.jsx`), 'utf8');
}

ruleTester.run('jsx-no-cyrillic', rule, {
    valid: [
        {
            name: 'Valid component without Cyrillic',
            code: getFixtureCode('valid'),
        }
    ],
  
    invalid: [
        {
            name: 'Invalid component with Cyrillic',
            code: getFixtureCode('invalid'),
            errors: [
                { message: 'The use of Cyrillic alphabet in React components is prohibited.' },
                { message: 'The use of Cyrillic alphabet in Props of React components is prohibited.' },
                { message: 'The use of Cyrillic alphabet in React components is prohibited.' },
                { message: 'The use of Cyrillic alphabet in React expressions is prohibited.' }
            ],
        },
    ],
});
  