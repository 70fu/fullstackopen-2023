import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({ filter, onChange }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={onChange} />
    </div>
  )
}

const PersonForm = ({ addPerson }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleAddPerson = (event) => {
    event.preventDefault();
    const trimmedName = newName.trim();
    const trimmedNumber = newNumber.trim();

    if (trimmedName.length == 0 || trimmedNumber.length == 0) {
      return;
    }

    if (addPerson(trimmedName, trimmedNumber)) {
      setNewName('');
      setNewNumber('');
    }
  }

  return (
    <form onSubmit={handleAddPerson}>
      <div>
        name: <input value={newName} onChange={handleNewNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNewNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = ({ person }) => {
  return (
    <>
      {person.name} {person.number}
      <br />
    </>
  );
}

const PersonList = ({ persons, filter }) => {
  return (
    <div>
      {persons.filter((person) => filter.trim().length === 0 || person.name.toLowerCase().includes(filter.toLowerCase()))
        .map((person) =>
          <Person key={person.id} person={person} />
        )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('');

  const personHook = ()=>{
    console.log('get persons');
    personService
      .getAll()
      .then(persons => {
        console.log('received persons');
        setPersons(persons);
      })
  }
  useEffect(personHook,[]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const addPerson = (newName, newNumber) => {
    if (persons.findIndex((person) => person.name === newName) > -1) {
      alert(`${trimmedName} has already been added to the phonebook`);
      return false;
    }

    const newPerson = {
      name: newName,
      number: newNumber
    };
    console.log('create person ',newPerson);
    personService
      .create(newPerson)
      .then(createdPerson => {
        console.log('created person ', createdPerson);
        setPersons(persons.concat(createdPerson));
      })
    return true;
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={handleFilterChange} />

      <h3>Add a new Person</h3>
      <PersonForm addPerson={addPerson} />

      <h3>Numbers</h3>
      <PersonList filter={filter} persons={persons} />
    </div>
  )
}

export default App