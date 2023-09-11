import { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({ message, typeClass}) => {
  if (message === null) {
    return null
  }

  return (
    <div className={`notification ${typeClass}`}>
      {message}
    </div>
  )
}

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

const Person = ({ person, handleDelete}) => {
  return (
    <>
      {person.name} {person.number}
      <button onClick={handleDelete}>delete</button>
      <br />
    </>
  );
}

const PersonList = ({ persons, filter, deletePerson }) => {

  return (
    <div>
      {persons.filter((person) => filter.trim().length === 0 || person.name.toLowerCase().includes(filter.toLowerCase()))
        .map((person) =>
          <Person key={person.id} person={person} handleDelete={()=>deletePerson(person.id)} />
        )}
    </div>
  )
}

const App = () => {
  const notificationTime = 5000;
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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

  const showError = (errorText)=>{
    console.log(errorText);
    setErrorMessage(errorText);
    setTimeout(()=>{
      setErrorMessage(null)
    }, notificationTime);
  }
  const showSuccess = (text)=>{
    console.log(text);
    setSuccessMessage(text);
    setTimeout(()=>{
      setSuccessMessage(null)
    }, notificationTime);
  }

  const deletePerson = (id)=>{
    console.log('delete person');
    const person = persons.find((p)=>p.id===id);
    if(window.confirm(`Delete person ${person.name}?`)) {
      personService.deleteRes(id)
        .then(()=>{
          console.log(`person ${id} deleted`);
          setPersons(persons.filter((p)=>p.id!==id));
          showSuccess(`Removed ${person.name}`);
        })
    }
  }

  const addPerson = (newName, newNumber) => {
    const existingPerson = persons.find((person) => person.name === newName)
    if (existingPerson !== undefined) {
      if(window.confirm(`${newName} has already been added to the phonebook, replace the old number with a new one?`)){
        personService.update(existingPerson.id,{...existingPerson,name:newName,number:newNumber})
        .then(updatedPerson =>{
          console.log('person updated');
          setPersons(persons.map((p)=>p.id!==updatedPerson.id?p:updatedPerson));
          showSuccess(`updated phone number of ${updatedPerson.name} to ${updatedPerson.number}`);
        })
        .catch((error)=>{
          showError(`the person ${existingPerson.name} has already been removed from the server`);
          setPersons(persons.filter((p)=>p.id!==existingPerson.id));
        })
        return true;
      }
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
        showSuccess(`Added ${createdPerson.name}`);
      })
      .catch(error=>{
        showError(error.response.data.error);
      })
    return true;
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} typeClass="error"/>
      <Notification message={successMessage} typeClass="success"/>
      <Filter filter={filter} onChange={handleFilterChange} />

      <h3>Add a new Person</h3>
      <PersonForm addPerson={addPerson} />

      <h3>Numbers</h3>
      <PersonList filter={filter} persons={persons}  deletePerson={deletePerson}/>
    </div>
  )
}

export default App