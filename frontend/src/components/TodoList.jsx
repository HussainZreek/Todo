import TodoItem from "./todoItem"

const TodoList = ({todos, deleteTodo, changeImportance, changeCompletion}) => {
    return (
      <ul className="todo-list">
        {todos.map(todo => <TodoItem todo={todo} key={todo.id} deleteTodo={deleteTodo} changeImportance={changeImportance} changeCompletion={changeCompletion} />)}
      </ul>
    )
}

export default TodoList