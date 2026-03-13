import axios from "axios"
import { useState, useEffect } from "react"
import AddTodoForm from "./components/AddForm"
import TodoList from "./components/TodoList"
import Filter from "./components/Filter"
import './App.css'

const App = () => {
  const [todos, setTodos] = useState([])
  const [filterText, setFilterText] = useState('')
  const [filterImportant, setFilterImportant] = useState(false)


  const baseURL = 'http://localhost:3001/api/todos'
  
  useEffect(() => {
    axios
    .get(baseURL)
    .then(response => {
      console.log(`data arrived: `, response.data)
      setTodos(response.data)
    })
  }, [])

  const handleCreateTodo = (todoObject) => {
    axios
    .post(baseURL, todoObject)
    .then(response => {
       setTodos(todos.concat(response.data))
    })
  }

  const handleDeleteTodo = (id) => {
     axios
     .delete(`${baseURL}/${id}`)
     .then(() => {
      const updatedTodos = todos.filter(t => t.id !== id)
      setTodos(updatedTodos)
     })
     .catch(error => console.log('Delete error:', error))
  }

  const toggleImportance = (id) => {
    const todo = todos.find(t => t.id === id)
    const changedTodo = {...todo, important: !todo.important}
    axios
    .patch(`${baseURL}/${id}`,changedTodo)
    .then(response => {
      setTodos(todos.map(t => t.id !== id ? t : response.data))
    })
  }

  const toggleCompletion = (id) => {
    const todo = todos.find(t => t.id === id)
    const changedTodo = {...todo, completed: !todo.completed}
    axios
    .patch(`${baseURL}/${id}`,changedTodo)
    .then(response => {
      setTodos(todos.map(t => t.id !== id ? t : response.data))
    })
  }

   const todosToShow = todos.filter(todo => {
     const matchesText = todo.content.toLowerCase().includes(filterText.toLowerCase())
     const matchesImportant = filterImportant ? todo.important : true
     return matchesText && matchesImportant
   })
   
  return (
  <div className="app-container">
    <h1>Smart To-Do</h1>
    <AddTodoForm createTodo={handleCreateTodo} />
    <Filter filter={filterText} setFilter={setFilterText} filterImportant={filterImportant} setFilterImportant={setFilterImportant}/>
    <TodoList todos={todosToShow} deleteTodo={handleDeleteTodo} changeImportance={toggleImportance} changeCompletion={toggleCompletion} />
  </div>
  )
}

export default App
