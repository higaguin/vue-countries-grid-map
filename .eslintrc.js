module.exports = {
  root: true,
  parser: 'vue-eslint-parser',

  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2017,
    parser: 'babel-eslint',
  },

  // required to lint *.vue files
  plugins: [
    'vue',
  ],

  env: {
    browser: true,
    node: true,
  },

  // add your custom rules here
  rules: {
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },

  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
    'plugin:vue/essential',
    '@vue/standard',
  ],
}
