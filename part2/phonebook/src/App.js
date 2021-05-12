
import React, { useState, useEffect } from 'react'
import phonebookService from './services/phonebooks'



const Filter = (props) => {
  return (
    <div>
      filter shown with <input value={props.newFilter} onChange={props.handleFilterChange} />
    </div>
  )
}

const Person = ({ person, deletePhone }) => {

  return (
    <div>
      <p>
        {person.name} {person.number}
        <button onClick={deletePhone}>Delete</button>

      </p>
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

  const filteredPersons = props.persons.filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase()))

  return (
    <>
      {filteredPersons.map(person => <Person key={person.name} person={person} deletePhone={() => props.deletePhoneOf(person.id)} />)}
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

  useEffect(() => {

    phonebookService
      .getAll()
      .then(initialPhones => {
        setPersons(initialPhones)
      })
  }, [])


  const deletePhoneOf = id => {

    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name} ?`)) {
      phonebookService.remove(id)
      .then(setPersons(persons.filter(p => p.id !== id)))
    }
  }



  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
    console.log(persons.filter(person => person.name.includes(newFilter)))
  }

  const addNewEntry = (event) => {
    event.preventDefault()
    
    const searchedPerson = persons.find(element => element.name === newName)

    

    if (searchedPerson) {
      
      const nameObject = {
        name: newName,
        number: newNumber
      }

      if(window.confirm(`${newName} is already added. Do you want to update the phone number?`)){
        phonebookService.update(searchedPerson.id, nameObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== searchedPerson.id ? person : returnedPerson))
        })
      }
    }
    else {
      const nameObject = {
        name: newName,
        number: newNumber
      }

      phonebookService.create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })

      // axios.post('http://localhost:3001/persons', nameObject)
      // .then(response => {

      // })

      // setPersons(persons.concat(nameObject))
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h3>Add a new person</h3>

      <PersonForm addNewEntry={addNewEntry} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />


      <h2>Numbers</h2>

      <Persons persons={persons} filter={newFilter} deletePhoneOf={deletePhoneOf} />
    </div>
  )
}

export default App
