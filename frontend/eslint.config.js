// eslint.config.js
import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import tsParser from '@typescript-eslint/parser';
import ts from '@typescript-eslint/eslint-plugin';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    {
        files: ['**/*.vue'],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: tsParser,
                ecmaVersion: 2021,
                sourceType: 'module',
            },
        },
        plugins: {
            vue,
            '@typescript-eslint': ts,
        },
        rules: {
            // базовый набор для vue3
            ...vue.configs['vue3-recommended'].rules,

            // ts-рекомендации (по желанию можно ослабить)
            ...ts.configs.recommended.rules,

            'vue/max-attributes-per-line': [
                'error',
                {
                    singleline: 1,
                    multiline: 1,
                },
            ],
        },
    },
    {
        // отдельный блок для .ts/.js файлов (без template)
        files: ['**/*.ts', '**/*.js'],
        languageOptions: {
            parser: tsParser,
            ecmaVersion: 2021,
            sourceType: 'module',
        },
        plugins: {
            '@typescript-eslint': ts,
        },
        rules: {
            ...ts.configs.recommended.rules,
        },
    },
];
