const notesRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Note = require('../models/note');
const User = require('../models/user');

notesRouter.get('/', async (request, response, next) => {
  try {
    const notes = await Note
      .find({})
      .populate('user', { username: 1, name: 1 });

    response.json(notes.map(note => note.toJSON()));
  } catch (error) {
    next(error);
  }
});

notesRouter.get('/:id', async (request, response, next) => {
  try {
    const note = await Note
      .findById(request.params.id)
      .populate('user', { username: 1, name: 1 });
    if (note) {
      response.json(note);
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

const getTokenFrom = request => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }

  return null;
};

notesRouter.post('/', async (request, response, next) => {
  const body = request.body;
  const token = getTokenFrom(request);

  if (!token) {
    return response.status(401).json('token missing');
  }

  let decodedToken;
  try {
    // eslint-disable-next-line
    decodedToken = jwt.verify(token, process.env.SECRET); 
  } catch(exception) {
    return response.status(401).json('invalid token');
  }  

  const user = await User.findById(decodedToken.id);
  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
    user: user._id
  });

  try {
    const savedNote = await note.save();
    user.notes = user.notes.concat(savedNote._id);
    await user.save();

    response.json(savedNote);
  } catch (error) {
    next(error);
  }
});

notesRouter.put('/:id', async (request, response, next) => {
  const body = request.body;
  console.log(body);

  const note = {
    content: body.content,
    important: body.important
  };

  try {
    const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, { new: true });
    response.json(updatedNote);
  } catch (exception) {
    next(exception);
  }
});

notesRouter.delete('/:id', async (request, response, next) => {
  try {
    await Note.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

module.exports = notesRouter;