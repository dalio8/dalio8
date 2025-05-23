import React from 'react';
import '../styles/TodoItem.css';

const TodoItem = ({ taskName, taskDescription, dueDate, isComplete, toggleComplete, deleteTodo }) => {
  return (
    <div className="todo-item">
      <h3>{taskName}</h3>
      <p>{taskDescription}</p>
      <p>Due Date: {dueDate}</p>
      <div>
        <input type="checkbox" checked={isComplete} onChange={toggleComplete} />
        <label>Completed</label>
      </div>
      <button>Edit</button>
      <button onClick={deleteTodo}>Delete</button>
    </div>
  );
};

export default TodoItem;
