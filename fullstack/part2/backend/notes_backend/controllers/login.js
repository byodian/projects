const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
  const body = request.body;

  const user = await User.findOne({ email: body.email });
  const passwordCorrect = user === null 
    ? false
    : await bcrypt.compare(body.password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invaild email or password'
    });
  }

  const usreForToken = {
    username: user.username,
    email: user.email,
    id: user._id
  };

  const token = jwt.sign(usreForToken, process.env.SECRET); // eslint-disable-line no-undef
  response
    .status(200)
    .send({ token, username: user.username, email: user.email });
});

module.exports = loginRouter;