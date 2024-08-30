// src/App.js
import React from 'react';
import TaskList from './TaskList';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TaskList />
    </div>
  );
}

export default App;
