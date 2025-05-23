import React from 'react';
import TodoList from '../components/TodoList';
import PomodoroTimer from '../components/PomodoroTimer';
import '../styles/ListView.css';

const ListView = () => {
  return (
    <div className="list-view">
      <PomodoroTimer />
      <TodoList />
    </div>
  );
};

export default ListView;
