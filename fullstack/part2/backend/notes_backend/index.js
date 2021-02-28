require('dotenv').config();
const express = require('express');
const app = express();
const Note = require('./models/note');

const setHeaders = (request, response, next) => {
  response.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  response.set('Access-Control-Allow-Methods', 'PUT,DELETE,GET,POST');
  response.set('Access-Control-Allow-Headers', 'Content-Type,API-KEY');
  response.set('Access-Control-Allow-Credentials', 'true');
  next();
}

const errorHandler = (error, request, response, next) => {
  console.log(error.message);
  console.log(error.name);

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id'});
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
}

app.use(express.static('build'));
app.use(express.json());
app.use(setHeaders);

app.get('/', (request, response) => {
  response.send('<h1>Hey There!</h1>');
});

app.get('/api/notes', (request, response, next) => {
  Note
    .find({})
    .then(notes => {
      response.json(notes);
    })
    .catch(error => next(error));
});

app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
  .then(note => {
    if (note) {
      response.json(note);
    } else {
      response.status(404).end();
    }
  })
  .catch(error => next(error));
});

app.post('/api/notes', (request, response, next) => {
  const body = request.body;
  
  if (body.content === undefined) {
    return response.status(400).json({
      error: 'content missing'
    });
  }
  
  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });
  
  note
    .save()
    .then(savedNote => savedNote.toJSON())
    .then(savedAndFormattedNote => {
      response.json(savedAndFormattedNote);
    })
    .catch(error => next(error));
})

app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote);
    })
    .catch(error => next(error));
})

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
