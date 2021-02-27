require('dotenv').config();
const express = require('express');
const app = express();
const Note = require('./models/notes');

const setHeaders = (request, response, next) => {
  response.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  response.set('Access-Control-Allow-Methods', 'PUT,DELETE,GET,POST');
  response.set('Access-Control-Allow-Headers', 'Content-Type,API-KEY');
  response.set('Access-Control-Allow-Credentials', 'true');
  next();
}

app.use(express.static('build'));
app.use(express.json());
app.use(setHeaders);

app.get('/', (request, response) => {
  response.send('<h1>Hey There!</h1>');
});

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes);
  })
});

app.get('/api/notes/:id', (request, response) => {
  const id = parseInt(request.params.id, 10);
  const note = notes.find(note => note.id === id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0;
  
  return maxId + 1;
}

app.post('/api/notes', (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date().toISOString(),
    id: generateId()
  }

  notes = notes.concat(note);
  response.json(note);
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter(note => note.id !== id);

  response.status(204).end();
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
