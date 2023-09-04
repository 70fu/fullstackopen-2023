import { useState } from 'react'

const Person = ({person}) =>{
  return (
    <>
    {person.name}
    <br/>
    </>
  );
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNewNameChange = (event) =>{
    setNewName(event.target.value);
  };

  const addPerson = (event) =>{
    event.preventDefault();
    const trimmedName = newName.trim();

    if(trimmedName.length==0){
      return;
    }
    if(persons.findIndex((person)=>person.name===trimmedName)>-1){
      alert(`${trimmedName} has already been added to the phonebook`);
      return;
    }

    const newPerson = {
      name:trimmedName
    }
    setPersons(persons.concat(newPerson));
    setNewName('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewNameChange}/>
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