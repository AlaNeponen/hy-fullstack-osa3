const cors = require('cors')
app.use(cors())
require('dotenv').config()
const { request, response } = require('express')
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
const person = require('./models/person')
const app = express()

app.use(morgan('tiny'))
app.use(express.json())
app.use(express.static('build'))

const generateId = (max, min) => {
  return Math.random() * (max - min) + min;
}
app.get(`/api/persons`, (request, response) => {
    Person.find({}).then(people => {
      response.json(people)
    })
})
app.get(`/api/persons/:id`, (request, response) => {
    Person.findById(request.params.id).then(person => {
      response.json(person)
    })
})
app.get(`/info`, (request, response) => {
    const now = new Date().toUTCString()
    const text = `Phonebook has info for ${persons.length} people <br/> ${now}`
    response.send(text)
    
})
app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id).then(
    response.status(204).end()
  )
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

  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})