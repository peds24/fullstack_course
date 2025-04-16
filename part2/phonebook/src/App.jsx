import { use, useState } from 'react'
const Filter = (props) => {
  const {newFilter, handleNewFilter} = props
  return(
    <div>
      Filter names with <input  value={newFilter} onChange={handleNewFilter}/>
    </div>
  )
}

const PersonForm = (props) => {
  const {addPerson, newName, newNumber, handleNewName, handleNewNumber} = props
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const DisplayNames = (props) => {
  const {persons, newFilter} = props
  return (
    <div>
      {persons.filter(person => 
        person.name.toLowerCase().includes(newFilter.toLowerCase())
      ).map(person =>
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      )}
    </div>
  )
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

  // Filtering
  const [newFilter, setNewFilter] = useState('')

  // Person Handling + phone
  const addPerson = (event) => {
    event.preventDefault()

    const nameArr = persons.map(person => person.name)
    if(nameArr.includes(newName)){
      window.alert(`${newName} is already added to phonebook`)
    } else{
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }
  
  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  // Phone Handling
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  // Query Handling
  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        newFilter={newFilter} 
        handleNewFilter={handleNewFilter}
      />
      
      <h2>Add New Person</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />

      <h2>Numbers</h2>
      <DisplayNames 
        persons={persons}
        newFilter={newFilter}
      />
    </div>
  )
}

export default App