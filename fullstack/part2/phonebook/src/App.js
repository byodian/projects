import React, { useEffect, useState } from 'react';
import Filter from './componets/Filter';
import PersonForm from './componets/PersonForm';
import Persons from './componets/Persons';
import personsServices from './services/persons'
import Notification from "./componets/Notification";
import './index.css';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');
  const [ warnMessage, setWarnMessage ] = useState(null);
  const [ warnClassName, setWarnClassName ] = useState('');

  useEffect(() => {
    personsServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
  }, []);

  const warnMessageFn = (message, name, timer = 5000) => {
    setWarnMessage(message)
    setWarnClassName(name);

    setTimeout(() => {
      setWarnMessage(null);
    }, timer);
  }

  const updatePerson = (person) => {
    const message = `${person.name} is already added to phonebook, replac the old number with a new one?`;
    if (person && window.confirm(message)) {
      const id = person.id;
      const changedPerson = { ...person, number: newNumber };

      personsServices
        .update(id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== id ? p : returnedPerson));
          setNewName('');
          setNewNumber('');
        })
        .catch(() => {
          const message = `Infomation of ${person.name} has already been removed from server`;
          warnMessageFn(message, 'fail');
          setPersons(persons.filter(p => p.id !== id));
        })
    }
  }

  // Check inputs fields
  const isEmpty = () => {
    if (newName === '' || newNumber === '') {
      alert("Name or Number input field can't be empty.");
      return;
    };
  }

  const addPerson = (event) => {
    event.preventDefault();
    isEmpty();
    const person = persons.find(person => person.name === newName);
    
    // If person doesn't exist, then POST it into server.
    if (person === undefined) {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      personsServices
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          warnMessageFn(`Added ${returnedPerson.name}`, 'pass');
        })
        .catch(error => {
          console.dir(error);
          warnMessageFn(`${error.response.data.error}`, 'fail');
        })
    } else {
      // If person exists, then put it into service
      updatePerson(person);
    }
  }

  // Filter persons with name message
  const personsToShow = persons.filter(person => 
    person.name
      .toLowerCase()
      .includes(filter.toLocaleLowerCase())
  ); 

  const handleChange = (fn) => (event) => {
    fn(event.target.value);
  }

  const handleDeleteClick = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsServices
        .remove(id)
        .then(returnedPerson => {
          setPersons(returnedPerson);
          warnMessageFn('Deleted successfully', 'pass');
        })
        .catch(() => {
          const message = `Information of ${name} has already been removed from server`;
          warnMessageFn(message, 'fail');
          setPersons(persons.filter(p => p.id !== id));
        })
    }
  }

  const formProps = {
    handleNameChange: handleChange(setNewName),
    handleNumberChange: handleChange(setNewNumber),
    addPerson,
    setFilter,
    newName,
    newNumber
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={warnMessage} className={warnClassName} />
      <Filter 
        filter={filter} 
        handleChange={handleChange(setFilter)}
      />
      <h2>Add a new person</h2>
      <PersonForm o={formProps} />
      <h2>Numbers</h2>
      <Persons 
        persons={personsToShow}
        handleClick={handleDeleteClick}
      />
    </div>
  );
}

export default App;