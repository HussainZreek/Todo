require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const Todo = require('./models/todo')

const url = process.env.MONGODB_URL

mongoose.set('strictQuery', false)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

app.get('/api/todos', (request, response) => {
    Todo
    .find({})
    .then(todos => {
      response.json(todos)
    })
})

app.post('/api/todos', (request, response) => {
    const body = request.body
    const todo = new Todo ({
        content: body.content,
        completed: body.completed,
        important: body.important
    })
    todo
    .save()
    .then(savedTodo => {
        response.json(savedTodo)
    })
    .catch(error => {
        console.log(error)
        response.status(400).send({error: "unsaveble todo"})
    })
})

app.delete('/api/todos/:id', (request, response) => {
    const id = request.params.id
    Todo
    .findByIdAndDelete(id)
    .then(() => {
        response.status(204).end()
    })
    .catch(error => {
        console.log(error)
        response.status(404).send({error: "malformed id"})
    })
})

app.patch('/api/todos/:id', (request, response) => {
    const id = request.params.id
    const body = request.body
    const todo = {
        content: body.content,
        completed: body.completed,
        important: body.important
    }
    Todo
    .findByIdAndUpdate(id, todo, {new: true})
    .then(updatedTodo => {
        response.json(updatedTodo)
    })
    .catch(error => {
        console.log(error)
        response.status(404).send({error: "something is wrong"})
    })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})