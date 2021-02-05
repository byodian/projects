import React, { useState } from 'react';
import Filter from './componets/Filter';
import PersonForm from './componets/PersonForm';
import Persons from './componets/Persons';

const App = (props) => {
  const [ persons, setPersons ] = useState(props.persons);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    if (newName === '' || newNumber === '') {
      alert("These inputs can't be empty.");
      return;
    };

    for (let person of persons) {
      if (person.name === newName) {
        alert(`${newName} is already added to phonebook`);
        return;
      }
    }
    
    const newPerson = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
  }

  const handleChange = (fn) => (event) => {
    fn(event.target.value);
  }

  const personsToShow = persons.filter(person => 
    person.name
      .toLowerCase()
      .includes(filter.toLocaleLowerCase())
  ); 

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
      <Persons persons={personsToShow}/>
    </div>
  );
}

export default App;