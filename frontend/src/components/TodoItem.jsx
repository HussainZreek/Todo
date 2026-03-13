const TodoItem = ({todo, deleteTodo, changeImportance, changeCompletion}) => {
    return (
        <li className="todo-item">
            <span 
                className={`todo-content ${todo.completed ? 'completed' : ''}`}
                onClick={() => changeCompletion(todo.id)}
                style={{ cursor: 'pointer' }}
            >
                {todo.content}
            </span>

            <button 
                className={`btn-action ${todo.important ? 'btn-important' : ''}`}
                onClick={() => changeImportance(todo.id)}
            >
                {todo.important ? '★' : '☆'}
            </button>


            <button className="btn-action btn-delete" onClick={() => deleteTodo(todo.id)}>
                Delete
            </button>
        </li>
    )
}

export default TodoItem