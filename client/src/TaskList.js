// src/TaskList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('There was an error fetching tasks!', error));
  }, []);

  const addTask = () => {
    axios.post('http://localhost:5000/tasks', { title: newTask, completed: false })
      .then(response => setTasks([...tasks, response.data]))
      .catch(error => console.error('There was an error adding the task!', error));
    setNewTask('');
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task._id !== id)))
      .catch(error => console.error('There was an error deleting the task!', error));
  };

  const toggleCompletion = (id, completed) => {
    axios.put(`http://localhost:5000/tasks/${id}`, { completed: !completed })
      .then(response => setTasks(tasks.map(task => (task._id === id ? response.data : task))))
      .catch(error => console.error('There was an error updating the task!', error));
  };

  return (
    <div>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <span
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
              onClick={() => toggleCompletion(task._id, task.completed)}
            >
              {task.title}
            </span>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
