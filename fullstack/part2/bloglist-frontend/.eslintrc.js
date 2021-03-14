module.exports = {
  'env': {
    'node': true,
    'es6': true,
    'browser': true,
    'jest/globals': true,
    'cypress/globals': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'parserOptions': {
    'sourceType': 'module',
    'ecmaVersion': '2018',
    'ecmaFeatures': {
      'jsx': true
    }
  },
  'plugins': [
    'react', 'jest', 'cypress'
  ],
  'rules': {
    'no-console': 0,
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
    'no-trailing-spaces': 'error',
    'arrow-spacing': ['error', { before: true, after: true }],
    'eqeqeq': 'error',
    'react/prop-types': 0
  },
  'settings': {
    'react': {
      'version': 'detect'
    }
  }
};