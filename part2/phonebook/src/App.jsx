import { useState, useEffect } from 'react'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import DisplayNames from './components/DisplayNames'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    // Filtering
    const [newFilter, setNewFilter] = useState('')
    const [message, setMessage] = useState(null)

    // Get data from json server
    useEffect(() => {
        personService.getAll().then(initialPersons => {
            setPersons(initialPersons)
        })
    }, [])

    // Person Handling + phone
    const addPerson = (event) => {
        event.preventDefault()

        const person = persons.find(n => n.name === newName)
        if (person) {
            // Add put to update the new number of this name
            if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
                const changedPerson = { ...person, number: newNumber }
                personService
                    .updateEntry(person.id, changedPerson)
                    .then(() => {
                        personService.getAll().then(initialPersons => {
                            setPersons(initialPersons)
                            setMessage(`Updated ${person.name}'s number successfully`)
                            setTimeout(() => {
                                setMessage(null)
                            }, 5000)
                        })
                    })
                    .catch(error => {
                        setMessage(`Error updating ${person.name}'s information: ${error.message}`)
                        setTimeout(() => {
                            setMessage(null)
                        }, 5000)
                    })
            }
        } else {
            const personObject = {
                name: newName,
                number: newNumber,
                id: `${persons.length + 1}`
            }

            personService.create(personObject)
                .then(returnedObject => {
                    setPersons(persons.concat(returnedObject))
                    setNewName('')
                    setNewNumber('')
                    setMessage(`Added ${newName} successfully`)
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
                .catch(error => {
                    setMessage(`Error adding ${newName}: ${error.message}`)
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
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

    // Deletion
    const deleteName = (id) => {
        const person = persons.find((n) => n.id === id)
        if (window.confirm(`Do you want to delete: ${person.name} ${person.number}`)) {
            personService.deleteEntry(id)
                .then(() => {
                    personService.getAll().then(initialPersons => {
                        setPersons(initialPersons)
                        setMessage(`Deleted ${person.name} successfully`)
                        setTimeout(() => {
                            setMessage(null)
                        }, 5000)
                    })
                })
                .catch(error => {
                    setMessage(`Error deleting ${person.name}: ${error.message}`)
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
        }
    }
    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} />
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
                deleteName={(id) => deleteName(id)}
            />
        </div>
    )
}

export default App