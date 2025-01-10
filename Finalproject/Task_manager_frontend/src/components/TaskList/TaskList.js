// src/components/TaskList.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem('authToken');

            try {
                const response = await fetch("http://localhost:3000/api/v1/tasks", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                const data = await response.json();
                if (response.ok) {
                    setTasks(data);
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    if (loading) return <div>Loading tasks...</div>;

    return (
        <div className="task-list">
            <h2>Tasks</h2>
            <button onClick={() => navigate('/')}>Create New Task</button>
            
            {tasks.length === 0 ? (
                <p>No tasks found</p>
            ) : (
                <div className="tasks-container">
                    {tasks.map((task) => (
                        <div key={task.id} className="task-item">
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <div className="task-details">
                                <span>Status: {task.status}</span>
                                <span>Due Date: {task.due_date}</span>
                            </div>
                            <div className="task-actions">
                                <button onClick={() => navigate(`/tasks/${task.id}/edit`)}>
                                    Edit
                                </button>
                                <button onClick={() => navigate(`/tasks/${task.id}/subtasks`)}>
                                    Add Subtask
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TaskList;