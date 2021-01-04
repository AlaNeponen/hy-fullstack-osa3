const { request, response } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))
require('dotenv').config()
const Person = require('./models/person')

app.get(`/api/persons`, (request, response) => {
    Person.find({}).then(people => {
      response.json(people.map(person => person.toJSON()))
    })
})
app.get(`/api/persons/:id`, (request, response, next) => {
    Person.findById(request.params.id).then(person => {
      if (person) {
        response.json(person.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))  
})
app.get(`/info`, (request, response) => {
    const now = new Date().toUTCString()
    const text = `Phonebook has info for ${persons.length} people <br/> ${now}`
    response.send(text)
    
})
app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id).then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
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

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unkown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})