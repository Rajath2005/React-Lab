import React, { useState } from "react";
import './App.css'


const Reminder = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ name: "", due: "", desc: "" });
  const [filter, setFilter] = useState("all");

  // Add Task
  const addTask = () => {
    if (!task.name || !task.due) return;

    setTasks([
      ...tasks,
      { ...task, id: Date.now(), completed: false }
    ]);

    setTask({ name: "", due: "", desc: "" });
  };

  // Toggle Complete
  const toggleCompletion = (id) => {
    setTasks(
      tasks.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // Filter
  const filteredTasks = tasks.filter(t => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  return (
    <div>
      <h2>Add Task</h2>

      <input
        placeholder="Task Name"
        value={task.name}
        onChange={e => setTask({ ...task, name: e.target.value })}
      />

      <input
        type="date"
        value={task.due}
        onChange={e => setTask({ ...task, due: e.target.value })}
      />

      <textarea
        placeholder="Description"
        value={task.desc}
        onChange={e => setTask({ ...task, desc: e.target.value })}
      />

      <button onClick={addTask}>Add Task</button>

      <h3>Filter</h3>
      <select onChange={e => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>

      <ul>
        {filteredTasks.map(t => (
          <li key={t.id}>
            <strong>{t.name}</strong> ({t.due})
            <button onClick={() => toggleCompletion(t.id)}>
              {t.completed ? "Pending" : "Completed"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reminder;