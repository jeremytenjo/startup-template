module.exports = {
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true,
  },
  ignorePatterns: [`node_modules`, `build`, `.env`, `dist`],
  plugins: [`react`, `react-hooks`, `import`, 'require-extensions'],
  extends: [
    `next/core-web-vitals`,
    `plugin:react/recommended`,
    `plugin:@typescript-eslint/recommended`,
    `plugin:storybook/recommended`,
    'plugin:require-extensions/recommended',
    'next',
    'prettier',
  ],
  parser: `@typescript-eslint/parser`,
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: `module`,
  },
  settings: {
    react: {
      createClass: `createReactClass`,
      pragma: `React`,
      version: `detect`,
    },
    propWrapperFunctions: [`forbidExtraProps`],
  },
  rules: {
    // typscript
    '@typescript-eslint/consistent-type-imports': 2,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-namespace': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-unused-vars': 1,
    // react
    'react/display-name': 0,
    'react/prop-types': 0,
    'react/jsx-fragments': [0, `syntax`],
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 0,
    'no-useless-catch': 1,
    'no-async-promise-executor': 0,
    'react/react-in-jsx-scope': 0,
    'react/react-in-jsx-scope': 2,
    'react/jsx-uses-react': 0,
    'react/jsx-no-undef': [
      2,
      {
        allowGlobals: true,
      },
    ],
    // miscellaneous
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],
    'prefer-const': 2,
    'no-var': 2,
    'no-const-assign': 1,
    'no-this-before-super': 1,
    'no-undef': 2,
    'no-unreachable': 2,
    'no-unneeded-ternary': 2,
    'import/no-anonymous-default-export': 0,
    'no-debugger': 1,
    'no-console': 0,
    'constructor-super': 1,
    'valid-typeof': 1,
    'arrow-body-style': ['error', 'always'],
  },
}
