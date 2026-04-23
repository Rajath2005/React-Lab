import React, { useState } from "react";
import './App.css';

function Reminder() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState({ name: "", due: "", desc: "" });
    const [filter, setFilter] = useState("all");

    const addTask = () => {
        if (!task.name || !task.due) return;
        setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
        setTask({ name: "", due: "", desc: "" });
    };

    const toggleCompletion = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const filteredTasks = tasks.filter(t =>
        filter === "all" ? true : filter === "completed" ? t.completed : !t.completed
    );

    return (
        <div className="container">
            <h2>Add New Task</h2>
            <input placeholder="Task Name" value={task.name} onChange={e => setTask({ ...task, name: e.target.value })} />
            <input type="date" value={task.due} onChange={e => setTask({ ...task, due: e.target.value })} />
            <textarea placeholder="Description (optional)" value={task.desc} onChange={e => setTask({ ...task, desc: e.target.value })} />
            <button onClick={addTask}>Add Task</button>

            <h3>Filter</h3>
            <select value={filter} onChange={e => setFilter(e.target.value)}>
                <option value="all">All Tasks</option>
                <option value="completed">Completed Tasks</option>
                <option value="pending">Pending Tasks</option>
            </select>

            <ul>
                {filteredTasks.map(t => (
                    <li key={t.id} className={`task-item ${t.completed ? "completed" : "pending"}`}>
                        <div className="task-header">
                            <strong>{t.name}</strong>
                            <button onClick={() => toggleCompletion(t.id)}>
                                {t.completed ? "Mark as Pending" : "Mark as Completed"}
                            </button>
                        </div>
                        <div><strong>Due:</strong> {t.due}</div>
                        {t.desc && <div><strong>Note:</strong> {t.desc}</div>}
                        <div className="status-label">Status: {t.completed ? "Completed" : "Pending"}</div>
                    </li>
                ))}
                {filteredTasks.length === 0 && <p className="no-tasks">No tasks to display</p>}
            </ul>
        </div>
    );
}
export default Reminder;