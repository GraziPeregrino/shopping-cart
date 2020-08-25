function Todo({ todo, index }) {
  return <div className="todo">{todo.text}</div>;
}
function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState("");
  const handleSubmit = (e) => {
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
        placeHolder="Add Todo ..."
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}

function App() {
  const [todos, setTodos] = React.useState([
    { text: "get apples", isCompleted: false },
    { text: "get oranges", isCompleted: false },
    { text: "get radishes", isCompleted: false },
  ]);
  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };
  let todoList = todos.map((todo, index) => (
    <Todo key={index} index={index} todo={todo} />
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
