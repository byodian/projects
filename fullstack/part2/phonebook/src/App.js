import React, { useEffect, useState } from 'react';
import Filter from './componets/Filter';
import PersonForm from './componets/PersonForm';
import Persons from './componets/Persons';
import personsServices from './services/persons'
import axios from 'axios';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');

  useEffect(() => {
    personsServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
  }, []);

  const updatePerson = (person) => {
    const message = `${person.name} is already added to phonebook, replac the old number with a new one?`;
    
    if (person && window.confirm(message)) {
      const changedPerson = { ...person, number: newNumber };
      const id = person.id;

      personsServices
        .update(id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson));
          setNewName('');
          setNewNumber('');
        })
    }
  }

  const isEmpty = () => {
    if (newName === '' || newNumber === '') {
      alert("These inputs can't be empty.");
      return;
    };
  }

  const addPerson = (event) => {
    event.preventDefault();
    isEmpty();

    const person = persons.find(person => person.name === newName);
    
    if (!person) {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      personsServices
        .create(newPerson)
        .then(returnedPersons => {
          setPersons(persons.concat(returnedPersons));
          setNewName('');
          setNewNumber('');
        })
    } else {
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

  const handleClick = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsServices
        .remove(id)
        .then(returnedPersons => {
          setPersons(returnedPersons);
        });
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
      <h2>Phonebook</h2>
      <Filter 
        filter={filter} 
        handleChange={handleChange(setFilter)}
      />
      <h3>add a new</h3>
      <PersonForm o={formProps} />
      <h3>Numbers</h3>
      <Persons 
        persons={personsToShow}
        handleClick={handleClick}
      />
    </div>
  );
}

export default App;