const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const loginRouter = require('express').Router();

loginRouter.post('/', async (req, res, next) => {
  const body = req.body;

  const user = await User.findOne({ username: body.username });

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).send({
      error: 'invalid username or password'
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id
  };

  try {
    const token = jwt.sign(userForToken, process.env.SECRET); // eslint-disable-line
    res.json({
      token,
      username: user.username,
      name: user.name
    });
  } catch(exception) {
    next(exception);
  }
});

module.exports = loginRouter;