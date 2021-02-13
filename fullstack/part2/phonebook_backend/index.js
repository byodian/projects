const express = require("express");
const app = express();

app.use(express.json());

let persons = [
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 1,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 2,
  },
  {
    id: 3,
    name: "Arto Hellas",
    number: '040-123456'
  },
  {
    id: 4,
    name: 'Ada Lovelace',
    number: '39-44-8484848'
  }
];

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
})

const generateId = (persons) => {
  const maxId = Math.max(...persons.map(p => p.id));
  return maxId + 1;
};

app.post('/api/persons', (request, response) => {
  const body = request.body;
  console.log(body);

  if (!body.name || !body.number) {
    return response.status(404).json({
      error: 'Name or number is missing'
    })
  }

  if (persons.find(p => p.name === body.name)) {
    return response.status(404).json({
      error: 'name must be unique'
    });
  }

  const person = {
    id: generateId(persons),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person);

  response.json(person);
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

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(p => p.id === id);

  if (!person) {
    return response.status(404).end();
  }

  response.json(person);
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(p => p.id !== id);
  response.status(204).end();
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})