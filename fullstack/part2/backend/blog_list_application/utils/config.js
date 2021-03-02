require('dotenv').config();

/* eslint-disable no-undef */
const mongoUrl = process.env.MONGODB_URL;
const PORT = process.env.PORT;

/* eslint-enable no-undef */

module.exports = {
  mongoUrl, PORT
};