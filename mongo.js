const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://tk-kayttaja:${password}@cluster0.bn1wv.mongodb.net/number-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length<5) {
    console.log('Phonebook:')
    Person.find({}).then(result => {
        result.forEach(numero => {
            console.log(numero)
        })
        mongoose.connection.close()
    })    
} else {
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
    name: name,
    number: number
    })

    person.save().then(response => {
    console.log('numero tallennettu!')
    mongoose.connection.close()
    })
}
