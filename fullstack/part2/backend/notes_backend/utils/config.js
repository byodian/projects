require('dotenv').config();

/* eslint-disable */
let PORT = process.env.PORT;
let MONGODB_URL = process.env.MONGODB_URL;

if (process.env.NODE_ENV === 'test') {
  MONGODB_URL = process.env.TEST_MONGODB_URI;
}

module.exports = {
  MONGODB_URL,
  PORT
};

