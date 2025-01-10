// components/TaskDashboard.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TaskDashboard() {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/api/tasks")
            .then((res) => {
                console.log('Response status:', res.status);
                return res.json();
            })
            .then((data) => {
                console.log('Fetched tasks:', data);
                setTasks(data);
            })
            .catch((error) => {
                console.error('Error fetching tasks:', error);
            });
    }, []);

    console.log('Current tasks in state:', tasks); // Debug current state

    return (
        <div>
            <h2>Task Dashboard</h2>
            <button onClick={() => navigate("/edit-task/new")}>Create New Task</button>
            <ul>
                {Array.isArray(tasks) && tasks.length > 0 ? (
                    tasks.map((task) => (
                        <li key={task.id} className="task-item">
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <div className="task-buttons">
                                <button onClick={() => navigate(`/edit-task/${task.id}`)}>Edit</button>
                                <button onClick={() => navigate(`/add-subtask/${task.id}`)}>Add Subtask</button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No tasks found</p>
                )}
            </ul>
        </div>
    );
}

export default TaskDashboard;