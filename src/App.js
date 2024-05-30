import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Bug 1: Incorrect useEffect dependency
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await response.json();
      setTodos(data.slice(0, 10)); // Get only the first 10 todos
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = () => {
    if (newTodo.trim() === '' || newTodo.length === 0) return; // Bug 2: Not handling empty input
    const todo = {
      id: todos.length + 1,
      title: newTodo,
      completed: false,
    };
    // Bug 3: Incorrectly updating state
    setTodos((todos) => ([...todos, todo]));
    setNewTodo('');
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {...todo, completed: !todo.completed}
       // Bug 4: Mutating state directly
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.title}
            <button onClick={() => toggleTodo(todo.id)}>Toggle</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
