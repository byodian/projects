require('dotenv').config();
const express = require("express");
const morgan = require('morgan');
const app = express();
const Person = require('./models/person');

const setHeaders = (request, response, next) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'DELETE,PUT,PATCH');
  response.set('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

morgan.token('body', function(req, res) {
  const body = JSON.stringify(req.body);
  return body.length > 2 ? body : 'No response body';
});
const custom = ':method :url :res[content-length] - :response-time ms :body';

app.use(express.json());
app.use(setHeaders);
app.use(express.static('build'));
app.use(morgan(`${custom}`));

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons);
  })
})

const generateId = (persons) => {
  const maxId = Math.max(...persons.map(p => p.id));
  return maxId + 1;
};

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(404).json({
      error: 'Name or number is missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then(savedPerson => {
    response.json(savedPerson);
  })
})

const makeup = (persons) => {
  return `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p> 
  `;
}

app.get('/info', (request, response) => {
  response.send(makeup(persons));
})

const setPerson = (request, response) => {
  const body = request.body;
  const id = request.params.id;
  const newPerson = {
    name: body.name,
    number: body.number,
    id: id
  }
  
  // persons = persons.map(person => person.id !== id ? person : newPerson);
  // response.json(newPerson);
}
app.put('/api/persons/:id', setPerson);

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person);
  })
});

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  persons = persons.filter(p => p.id !== id);
  response.status(204).end();
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
