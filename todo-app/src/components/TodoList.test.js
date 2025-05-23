import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from './TodoList';

// Mock TodoItem to simplify TodoList tests and focus on TodoList logic
jest.mock('./TodoItem', () => (props) => (
  <div data-testid="todo-item">
    <h3>{props.taskName}</h3>
    <p>{props.taskDescription}</p>
    <input type="checkbox" checked={props.isComplete} onChange={props.toggleComplete} />
    <button onClick={props.deleteTodo}>Delete</button>
  </div>
));

describe('TodoList Component', () => {
  const initialTodos = [
    { id: 1, taskName: 'Buy groceries', taskDescription: 'Milk, Eggs, Bread', dueDate: '2024-07-25', isComplete: false },
    { id: 2, taskName: 'Clean the house', taskDescription: 'Living room and kitchen', dueDate: '2024-07-26', isComplete: true },
  ];

  // Note: Since TodoList's initial state is hardcoded, we can't directly pass initialTodos as a prop.
  // We'll rely on the default state for some tests or modify the component if necessary for more control.
  // For now, tests will assume the default initial state of TodoList.

  test('renders a list of TodoItem components based on initial sample data', () => {
    render(<TodoList />);
    const todoItems = screen.getAllByTestId('todo-item');
    // This relies on the default initial state in TodoList.js
    expect(todoItems.length).toBe(initialTodos.length); 
    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    expect(screen.getByText('Clean the house')).toBeInTheDocument();
  });

  test('adds a new item to the list when "Add New Task" button is clicked', () => {
    render(<TodoList />);
    const addButton = screen.getByRole('button', { name: /add new task/i });
    fireEvent.click(addButton);

    const todoItems = screen.getAllByTestId('todo-item');
    expect(todoItems.length).toBe(initialTodos.length + 1);
    // The new task has a hardcoded name "New Task" in TodoList's addTodo function
    expect(screen.getByText('New Task')).toBeInTheDocument(); 
  });

  test('deletes an item when its delete button is clicked', () => {
    render(<TodoList />);
    let todoItems = screen.getAllByTestId('todo-item');
    expect(todoItems.length).toBe(initialTodos.length);

    // Get all delete buttons. We know their text content from the mock.
    // Let's delete the first item "Buy groceries"
    // We need to find the delete button associated with "Buy groceries"
    // Since the mock renders a simple structure, we can find the parent of the text, then the button.
    const taskNameToDelete = 'Buy groceries';
    const taskElement = screen.getByText(taskNameToDelete);
    const parentDiv = taskElement.closest('[data-testid="todo-item"]');
    const deleteButton = parentDiv.querySelector('button'); // The only button in our mock is Delete

    fireEvent.click(deleteButton);

    todoItems = screen.getAllByTestId('todo-item');
    expect(todoItems.length).toBe(initialTodos.length - 1);
    expect(screen.queryByText(taskNameToDelete)).not.toBeInTheDocument();
  });

  test('toggles an item completion status when its checkbox is clicked', () => {
    render(<TodoList />);
    
    const taskNameToToggle = 'Buy groceries'; // Initially false
    const taskElement = screen.getByText(taskNameToToggle);
    const parentDiv = taskElement.closest('[data-testid="todo-item"]');
    const checkbox = parentDiv.querySelector('input[type="checkbox"]');

    expect(checkbox).not.toBeChecked(); // Initial state from defaultProps

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked(); // Should now be checked

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked(); // Should be unchecked again
  });
});
