import React, { useState } from 'react';
import './App.css';

function TodoFunction() {
  const [tasks, setTasks] = useState([]);
  const [newtask, setNewTask] = useState('');

  const addTask = () => {
    if (newtask.trim() === '') return;
    const task = {
      id: Date.now(),
      text: newtask,
      completed: false,
    };
    setTasks([...tasks, task]);
    setNewTask('');


  };
  const toggleCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  return (
    <div className="Todo-Container">
      <h1>Todo-App</h1>
      <div>
        <input type="text" value={newtask} onChange={(e) => setNewTask(e.target.value)} placeholder='Add a new Task'></input>
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }} onClick={() => toggleCompletion(task.id)}>{task.text}</span>

            <button onClick={()=>deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>-

    </div>
  );

};

function App() {
  return (
    <div className='App'>
      <TodoFunction />
    </div>
  );
}
export default App;