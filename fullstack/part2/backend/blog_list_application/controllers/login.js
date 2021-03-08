const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const loginRouter = require('express').Router();

loginRouter.post('/', async (req, res, next) => {
  const body = req.body;
  
  const user = await User.findOne({ username: body.username });

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(user.passwordHash, body.password);

  if (!(user && passwordCorrect)) {
    return res.status(401).send({ error: 'invalid username or password' })
  }
});

module.exports = loginRouter;