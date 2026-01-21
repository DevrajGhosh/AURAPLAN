import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TodoList.css";

function TodoList({ userId }) {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:5000/api/todos/${userId}`)
      .then((res) => setTodos(res.data));
  }, [userId]);

  const addTodo = async () => {
    if (!text.trim()) return;

    const res = await axios.post("http://localhost:5000/api/todos", {
      userId,
      text,
      done: false
    });

    setTodos([...todos, res.data]);
    setText("");
  };

  const toggleTodo = async (id, done) => {
    await axios.put(`http://localhost:5000/api/todos/${id}`, {
      done: !done
    });

    setTodos(
      todos.map((t) =>
        t._id === id ? { ...t, done: !done } : t
      )
    );
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    setTodos(todos.filter((t) => t._id !== id));
  };

  const allDone = todos.length > 0 && todos.every((t) => t.done);

  return (
    <div>
      <h3>Your Tasks</h3>

      <div className="task-box">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map((t) => (
          <li key={t._id} className={t.done ? "done" : ""}>
            <span onClick={() => toggleTodo(t._id, t.done)}>
              {t.text}
            </span>
            <button onClick={() => deleteTodo(t._id)}>❌</button>
          </li>
        ))}
      </ul>

      {allDone && (
        <div className="congrats">
          🎉 All tasks completed! Great job!
        </div>
      )}
    </div>
  );
}

export default TodoList;
