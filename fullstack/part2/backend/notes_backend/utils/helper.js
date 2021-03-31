const jwt = require('jsonwebtoken');

const getDecodedToken = (token, response) => {
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET); 
    return decodedToken;
  } catch(exception) {
    return response.status(403).json('invalid token');
  }
};

module.exports = { getDecodedToken };