import { useState } from 'react'

const Person = ({person}) =>{
  return (
    <>
    {person.name} {person.number}
    <br/>
    </>
  );
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNewNameChange = (event) =>{
    setNewName(event.target.value);
  };

  const handleNewNumberChange = (event) =>{
    setNewNumber(event.target.value);
  };

  const addPerson = (event) =>{
    event.preventDefault();
    const trimmedName = newName.trim();
    const trimmedNumber = newNumber.trim();

    if(trimmedName.length==0 || trimmedNumber.length == 0){
      return;
    }
    if(persons.findIndex((person)=>person.name===trimmedName)>-1){
      alert(`${trimmedName} has already been added to the phonebook`);
      return;
    }

    const newPerson = {
      name:trimmedName,
      number:trimmedNumber
    }
    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person)=><Person key={person.name} person={person}/>)}
    </div>
  )
}

export default App