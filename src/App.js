import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import "./App.css";

function Todo({ todo, index, onComplete, removeTodo, onEditTodo, onSaveTodo }) {
  const [newTitle, setTitle] = useState(todo.title);

  return (
    <div style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }} className="todo">
      {
        !todo.isEditTable
          ?
          <span>{todo.title}</span>
          :
          <input type="text" value={newTitle} onChange={(e) => { setTitle(e.target.value) }} />
      }
      <div>
        {
          !todo.isEditTable
            ?
            <button onClick={() => { onEditTodo(index) }}>Edit</button>
            :
            <button onClick={() => { onSaveTodo(newTitle, index) }}>Save</button>
        }
        {
          !todo.isCompleted
            ?
            <button onClick={() => { onComplete(index) }}>Complete</button>
            :
            <button onClick={() => { onComplete(index) }}>Undo</button>
        }
        <button onClick={() => { removeTodo(index) }}>x</button>
      </div>
    </div>
  )
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState('')

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) {
      return;
    } else {
      addTodo(value);
      setValue('');
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input className="input" placeholder="Add Todo..." type="text" value={value} onChange={e => setValue(e.target.value)} />
      </form>
    </div>
  )
}

function App() {
  const [todos, setTodos] = useState([
    {
      title: "Learn React Hooks",
      isCompleted: false,
      isEditTable: false,
    },
    {
      title: "Build React App",
      isCompleted: false,
      isEditTable: false,
    },
    {
      title: "Publish on Github",
      isCompleted: false,
      isEditTable: false,
    }
  ])
  const [valueModified, setModified] = useState(null);
  const [currentDate, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date())
    }, 1000);
    if (valueModified) {
      alert('A todo was modified')
      setModified(null);
    }
    return () => {
      clearInterval(interval);
    }
  })

  const addTodo = title => {
    const newTodo = [...todos, { title }];
    setTodos(newTodo);
  }

  const onComplete = index => {
    todos[index].isCompleted = !todos[index].isCompleted;
    setTodos(todos);
  }

  const removeTodo = index => {
    todos.splice(index, 1);
    setTodos(todos);
  }

  const onEditTodo = index => {
    todos[index].isEditTable = true;
    setTodos(todos);
  }

  const onSaveTodo = (title, index) => {
    todos[index].title = title;
    todos[index].isEditTable = false;
    setTodos(todos);
    setModified(true);
  }

  return (
    <div className="app">
      <h4> Your Current Date: {`${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`}</h4>
      <div className="todo-list">
        {
          todos.map((x, index) => (
            <Todo key={index} index={index} todo={x} onComplete={onComplete} removeTodo={removeTodo} onEditTodo={onEditTodo} onSaveTodo={onSaveTodo} />
          ))
        }
        <TodoForm addTodo={addTodo} />
      </div>
      <Link to="/countries">Country List</Link>
    </div >
  );
}

export default App;
