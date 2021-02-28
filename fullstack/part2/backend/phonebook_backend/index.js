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

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id'});
  }

  next(error);
}

morgan.token('body', function(req, res) {
  const body = JSON.stringify(req.body);
  return body.length > 2 ? body : 'No response body';
});
const custom = ':method :url :res[content-length] - :response-time ms :body';

app.use(express.static('build'));
app.use(express.json());
app.use(setHeaders);
app.use(morgan(`${custom}`));

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(persons => {
      response.json(persons);
    })
    .catch(error => next(error));
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

  person.save()
    .then(savedPerson => {
      response.json(savedPerson);
    })
    .catch(error => next(error));
})

const makeup = (persons) => {
  return `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p> 
  `;
}

app.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    response.send(makeup(persons));
  })
})

const setPerson = (request, response, next) => {
  const body = request.body;

  const newPerson = {
    name: body.name,
    number: body.number,
  }
  
  Person.findByIdAndUpdate(request.params.id, newPerson, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson);
    })
    .catch(error => next(error));
}

app.put('/api/persons/:id', setPerson);

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => next(error));
})

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
