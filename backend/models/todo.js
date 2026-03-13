const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minlength: 5,
    },
    completed: {
        type: Boolean,
        default: false,ç
    },
    important: {
        type: Boolean,
        required: false,
    }
})

todoSchema.set('toJSON',{
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Todo', todoSchema)
