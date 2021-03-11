import React, { useState } from "react";

function Milestones() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [counter, setCounter] = useState(1);

  const onChange = (event) => {
    setInput(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setTodos([...todos, { title: input, id: counter, status: "red" }]);
    setCounter(counter + 1);
    setInput("");
  };

  const removeItem = (id) => {
    setTodos([...todos.filter((x, i) => i !== id)]);
  };

  const handleClick = (todo) => {
    if (todo.status === "red") {
      todo.status = "yellow";
    } else if (todo.status === "yellow") {
      todo.status = "green";
    } else if (todo.status === "green") {
      todo.status = "red";
    }

    setTodos([...todos]);
  };

  return (
    <div className="App">
      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <input
          type="text"
          name="title"
          style={{ flex: "10", padding: "5px" }}
          placeholder="Add Todo ..."
          value={input}
          onChange={onChange}
        />
        <input
          type="submit"
          value="Submit"
          className="btn"
          style={{ flex: "1" }}
        />
      </form>

      <ul>
        {todos.map((todo, idx) => {
          return (
            <li key={todo.id}>
              <span
                onClick={() => handleClick(todo)}
                style={{ color: todo.status }}
                value={todo.id}
                id={idx}
              >
                {todo.title}
              </span>
              <span>
                <button onClick={() => removeItem(idx)}>X</button>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Milestones;
