module.exports = {
  'env': {
    'browser': true,
    'node': true,
    'es6': true
  },
  'parserOptions': {
    'sourceType': 'module',
    'ecmaVersion': 2018,
    'ecmaFeatures': {
      'jsx': true
    }
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'plugins': [
    'react'
  ],
  'rules': {
    'no-console': 0,
    'react/prop-types': 0,
    'indent': ['error', 2],
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': ['error', {
      'before': true,
      'after': true
    }],
    'eqeqeq': 'error',
    'no-unused-vars': 'warn',
    'linebreak-style': ['error', 'unix']
  }
};