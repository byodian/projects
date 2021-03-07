module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2021': true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 12
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single',
      'avoid-escape'
    ],
    'semi': [
      'error',
      'always'
    ],
    'eqeqeq': ['warn', 'allow-null'],
    'no-console': 'off',
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }]
  }
};
