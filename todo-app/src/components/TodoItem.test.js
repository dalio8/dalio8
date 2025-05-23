import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoItem from './TodoItem';

describe('TodoItem Component', () => {
  const mockToggleComplete = jest.fn();
  const mockDeleteTodo = jest.fn();

  const defaultProps = {
    taskName: 'Test Task',
    taskDescription: 'This is a test description.',
    dueDate: '2024-07-30',
    isComplete: false,
    toggleComplete: mockToggleComplete,
    deleteTodo: mockDeleteTodo,
  };

  beforeEach(() => {
    // Clear mock call history before each test
    mockToggleComplete.mockClear();
    mockDeleteTodo.mockClear();
  });

  test('renders task name, description, and due date', () => {
    render(<TodoItem {...defaultProps} />);
    expect(screen.getByText(defaultProps.taskName)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.taskDescription)).toBeInTheDocument();
    expect(screen.getByText(`Due Date: ${defaultProps.dueDate}`)).toBeInTheDocument();
  });

  test('checkbox is unchecked when isComplete is false', () => {
    render(<TodoItem {...defaultProps} isComplete={false} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  test('checkbox is checked when isComplete is true', () => {
    render(<TodoItem {...defaultProps} isComplete={true} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  test('calls toggleComplete when checkbox is clicked', () => {
    render(<TodoItem {...defaultProps} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockToggleComplete).toHaveBeenCalledTimes(1);
  });

  test('calls deleteTodo when delete button is clicked', () => {
    render(<TodoItem {...defaultProps} />);
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);
    expect(mockDeleteTodo).toHaveBeenCalledTimes(1);
  });
});
