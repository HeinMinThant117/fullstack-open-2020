import React, { useState } from 'react'

const Filter = (props) => {
  return (
    <div>
      filter shown with <input value={props.newFilter} onChange={props.handleFilterChange} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addNewEntry}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} /> <br />
          number: <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = (props) => {
  if (props.filter === '') {
    return (
      <>
        {props.persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
      </>
    )
  }

  const filteredPersons = props.persons.filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase()))

  return (
    <>
        {filteredPersons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </>
  )
}

const App = () => {



  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '39-44-5656565' },
    { name: 'Poggers Man', number: '123213213-123213213' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')


  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
    console.log(persons.filter(person => person.name.includes(newFilter)))
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
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h3>Add a new person</h3>

      <PersonForm addNewEntry={addNewEntry} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />


      <h2>Numbers</h2>

      <Persons persons={persons} filter={newFilter} />
    </div>
  )
}

export default App
