import React, { useState } from 'react'

const App = () => {
  
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '39-44-5656565'},
    { name: 'Poggers Man', number: '123213213-123213213'}
  ]) 

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  let filteredLists = persons

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);

    filteredLists = persons.filter((person) => person.name.includes(event.target.value))
    console.log(filteredLists);
  }

  const addNewEntry = (event) => {
    event.preventDefault()

    if (persons.find(element => element.name === newName)) {
      alert(`${newName} is already added`)
    }
    else {
      const nameObject = {
        name: newName,
        number: newNumber
      }
  
      setPersons(persons.concat(nameObject))
    }

    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input value={newFilter} onChange={handleFilterChange}/>
      <form onSubmit={addNewEntry} >
        <div>
          name: <input value={newName} onChange={handleNameChange} /> <br />
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
     
      {filteredLists.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App
