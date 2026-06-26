module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended', 'plugin:storybook/recommended'],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_', 'varsIgnorePattern': '^_' }],
        '@typescript-eslint/no-explicit-any': 'warn'
    },
    overrides: [
        {
            // Test, story, and setup files legitimately use `any` (mocks, fixtures,
            // partial doubles) and re-export non-component helpers. Relax the rules
            // that only make sense for shipped source there.
            files: [
                '**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx',
                '**/*.stories.ts', '**/*.stories.tsx',
                'src/tests/**/*', '**/__tests__/**/*', '**/__mocks__/**/*',
                '**/test-utils/**/*', '**/*.setup.ts',
            ],
            rules: {
                '@typescript-eslint/no-explicit-any': 'off',
                'react-refresh/only-export-components': 'off',
            },
        },
    ],
}
