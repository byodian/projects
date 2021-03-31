const notesRouter = require('express').Router();
const Note = require('../models/note');
const User = require('../models/user');
const { getDecodedToken } = require('../utils/helper');

if (process.env.MODE_ENV !== 'production') {
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
}

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

notesRouter.post('/', async (request, response, next) => {
  const body = request.body;
  const re = /\s*(?:;|,|\s|\.|$)\s*/g;
  const tagsArray = body.tags ? body.tags.split(re) : ['未标记'];

  if (!request.token) {
    return response.status(401).json('token missing');
  }

  const decodedToken = getDecodedToken(request.token);
  const user = await User.findById(decodedToken.id);
  
  const note = new Note({
    content: body.content,
    like: false,
    date: new Date(),
    tags: tagsArray,
    user: user._id,
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
  const re = /\s*(?:;|,|\s|\.|$)\s*/g;
  const tagsArray = Array.isArray(body.tags) ? body.tags : body.tags.split(re);

  const note = {
    content: body.content,
    like: body.like,
    tags: tagsArray
  };

  try {
    const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, { new: true });
    response.json(updatedNote);
  } catch (exception) {
    next(exception);
  }
});

notesRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id;
  if (!request.token) return response.status(401).json('token missing');

  const decodedToken = getDecodedToken(request.token, response);
  const userId = decodedToken.id.toString();

  
  try {
    const user = await User.findById(decodedToken.id);
    const note = await Note.findById(id);
    if (note.user && note.user.toString() === userId) {
      await Note.findByIdAndRemove(id);
      user.notes = user.notes.filter(n => n._id.toString() !== id.toString());
      await user.save();
      response.status(204).end();
    } else {
      response.status(400).end();
    }
  } catch (exception) {
    next(exception);
  }
});

module.exports = notesRouter;