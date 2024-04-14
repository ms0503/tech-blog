'use strict';

/** @type {import('stylelint').Config} */
const config = {
    extends: [
        'stylelint-config-recommended-scss',
        'stylelint-config-recess-order'
    ],
    ignoreFiles: [
        '.next/**',
        'node_modules/**'
    ],
    rules: {
        'block-no-empty': null,
        'font-family-name-quotes': 'always-where-required',
        'function-url-quotes': 'always',
        'scss/at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: [
                    'tailwind'
                ]
            }
        ],
        'selector-attribute-quotes': 'always',
        'selector-pseudo-element-colon-notation': 'double'
    }
};

export default config;
