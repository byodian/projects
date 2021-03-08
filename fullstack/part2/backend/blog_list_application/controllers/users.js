const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

userRouter.get('/', async (req, res, next) => {
  try {
    const users = await User
      .find({})
      .populate('blogs', { title: 1, url: 1, likes: 1, author: 1 });

    res.json(users);
  } catch(exception) {
    next(exception);
  }
});

userRouter.get('/:id', async (req, res, next) => {
  try {
    const user = await User
      .findById(req.params.id)
      .populate('blogs', { title: 1, url: 1, likes: 1, author: 1 });

    res.json(user);
  } catch(exception) {
    next(exception);
  }
});

userRouter.post('/', async (req, res, next) => {
  const body = req.body;

  if (!body.password) {
    return res.status(400).send({
      error: 'missing password'
    });
  }

  if (body.password.length < 3) {
    return res.status(400).send({
      error: 'Path `username` (`se`) is shorter than the minimum allowed length'
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  });

  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch(exception) {
    next(exception);
  }
});

module.exports = userRouter;

