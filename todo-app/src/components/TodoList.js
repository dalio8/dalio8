import React, { useState } from 'react';
import TodoItem from './TodoItem';
import '../styles/TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, taskName: 'Buy groceries', taskDescription: 'Milk, Eggs, Bread', dueDate: '2024-07-25', isComplete: false },
    { id: 2, taskName: 'Clean the house', taskDescription: 'Living room and kitchen', dueDate: '2024-07-26', isComplete: true },
  ]);

  const addTodo = () => {
    const newTodo = {
      id: Date.now(), // simple unique id
      taskName: 'New Task',
      taskDescription: 'New task description',
      dueDate: new Date().toISOString().split('T')[0],
      isComplete: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-list">
      <h2>My ToDo List</h2>
      <button onClick={addTodo}>Add New Task</button>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          taskName={todo.taskName}
          taskDescription={todo.taskDescription}
          dueDate={todo.dueDate}
          isComplete={todo.isComplete}
          toggleComplete={() => toggleComplete(todo.id)}
          deleteTodo={() => deleteTodo(todo.id)}
        />
      ))}
    </div>
  );
};

export default TodoList;
