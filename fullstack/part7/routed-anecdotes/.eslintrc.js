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
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  'plugins': [
    'react',
  ],
  'rules': {
    'indent': ['error', 2],
    'semi': ['error', 'always'],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'arrow-spacing': [
      'error', { 'before': true, 'after': true }
    ],
    'object-curly-spacing': ['error', 'always'],
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'react/prop-types': 0,
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'react/no-unescaped-entities': 0
  },
  'settings': {
    'react': {
      'version': 'detect'
    }
  }
};