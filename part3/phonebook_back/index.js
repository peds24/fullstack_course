const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/info', (request, response) => {
    const currentTime = new Date()
    const personCount = persons.length
    response.send(`
        <p>Phonebook has info for ${personCount} people</p>
        <p>${currentTime}</p>
    `)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.name || !body.number){
        return response.status(400).json({
            error: 'name/number missing'
        })
    }

    if (persons.some(person => person.name === body.name)){
        return response.status(400).json({
            error: `name must be unique, ${body.name} already exists in phonebook`
        })
    }

    const newPerson = {
        id: Math.floor(Math.random() * 1000000).toString(),
        name: body.name,
        number: body.number
    }
    
    persons = persons.concat(newPerson)

    response.json(newPerson)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})