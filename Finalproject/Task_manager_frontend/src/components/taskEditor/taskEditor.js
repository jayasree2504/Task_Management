import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function TaskEditor() {
    const navigate = useNavigate();
    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        status: "To Do",
        due_date: "",
    });
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('authToken');

        try {
            const response = await fetch("http://localhost:3000/api/v1/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ task: taskData }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                const taskId = data.task.id;
                setTimeout(() => navigate(`/tasks/${taskId}/subtasks`), 2000);
            } else {
                setMessage(data.message || "Error creating task");
            }
        } catch (error) {
            setMessage("Network error");
        }
    };

    const handleAddSubtaskClick = () => {
        const taskId = 1;
        navigate(`/tasks/${taskId}/subtasks`);
    };

    // New function to handle viewing tasks
    const handleViewTasksClick = () => {
        navigate('/tasks'); // Navigate to tasks list page
    };
    
    return (
        <div className="task-editor">
            <h2>Create Task</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title:</label>
                    <input
                        type="text"
                        placeholder="Task Title"
                        value={taskData.title}
                        onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        placeholder="Task Description"
                        value={taskData.description}
                        onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Status:</label>
                    <select
                        value={taskData.status}
                        onChange={(e) => setTaskData({ ...taskData, status: e.target.value })}
                    >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Due Date:</label>
                    <input
                        type="date"
                        value={taskData.due_date}
                        onChange={(e) => setTaskData({ ...taskData, due_date: e.target.value })}
                    />
                </div>
                <div className="button-group">
                    <button type="submit">Save Task</button>
                    <button type="button" onClick={handleAddSubtaskClick}>Add Subtask</button>
                    <button type="button" onClick={handleViewTasksClick}>View Tasks</button>
                </div>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default TaskEditor;