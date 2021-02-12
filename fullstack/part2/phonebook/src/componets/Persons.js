const Persons = ({ persons, handleClick }) => (
  <div>
    {persons.map(person => (
      <p key={person.id}>
        {person.name} {person.number}
        <button onClick={() => handleClick(person.name, person.id)}>delete</button>
      </p>)
    )}
  </div>
);

export default Persons;