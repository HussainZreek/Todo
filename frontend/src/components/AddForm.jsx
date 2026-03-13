import { useState} from "react"

const AddTodoForm = ({createTodo}) => {
    const [task, setTask] = useState("")
    const [important, setImportant] = useState(false)

    const handleImportantChange = (event) => {
        setImportant(event.target.checked)
    }

    const handleTaskChange = (event) => {
        setTask(event.target.value)
    }

    const addTodo = (event) => {
        event.preventDefault()
        const todoObject = {
            content: task, 
            important: important,
            completed: false
        }
        createTodo(todoObject)
        setTask('')
        setImportant(false)
    }

    return(
    <div className="add-todo-form">
  <h3>Create New Task</h3>
  <form onSubmit={addTodo} className="input-group">
    <div>
      Task: 
      <input 
        className="text-input" 
        value={task} 
        onChange={handleTaskChange} 
        placeholder="Type something..."
      />
    </div>

    <div className="checkbox-group">
      <label style={{ cursor: 'pointer', display: 'flex', gap: '8px', alignItems: 'center' }}>
        Important: 
        <input 
          checked={important} 
          type="checkbox" 
          onChange={handleImportantChange} 
        />
      </label>
    </div>

    <div>
      <button className="submit-btn" type="submit" style={{ width: '100%' }}>
        Add  
      </button>
    </div>
  </form>
</div>
    )
}

export default AddTodoForm