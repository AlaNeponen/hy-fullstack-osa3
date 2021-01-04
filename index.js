const { request, response } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
let persons =[
      {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
      },
      {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
      },
      {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
      },
      {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
      }
    ]

const generateId = (max, min) => {
  return Math.random() * (max - min) + min;
}
app.get(`/api/persons`, (request, response) => {
    response.json(persons)
})
app.get(`/api/persons/:id`, (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (!person) {
        response.status(404).end()
    }
    response.json(person)
})
app.get(`/info`, (request, response) => {
    const now = new Date().toUTCString()
    const text = `Phonebook has info for ${persons.length} people <br/> ${now}`
    response.send(text)
    
})
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id != id)

  response.status(204).end()
})
app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }
  const oldName = persons.find(person => person.name === body.name)
  if (oldName) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(10000, 1)
  }
  persons = persons.concat(person)
  response.json(person)
})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})