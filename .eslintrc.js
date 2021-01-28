module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    curly: [2, 'multi-line'],
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    semi: [2, 'always'],
  },
};
