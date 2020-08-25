function Todo({ todo, index, removeTodo }) {
  return (
    <div
      className="todo"
      key={index}
      onClick={() => {
        removeTodo(index);
      }}
    >
      {todo.text}
    </div>
  );
}
function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState("");
  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="Add Todo ..."
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

function App() {
  const [todos, setTodos] = React.useState([
    { text: "get apples", isCompleted: false },
    { text: "get oranges", isCompleted: false },
    { text: "get radishes", isCompleted: false }
  ]);
  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };
  const removeTodo = index => {
    let newTodos = todos.filter((item, i) => i != index);
    setTodos(newTodos);
  };
  let todoList = todos.map((todo, index) => (
    <Todo key={index} index={index} todo={todo} removeTodo={removeTodo} />
  ));
  return (
    <div className="app">
      <div className="todo-list">
        {todoList}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
