import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function SubtaskCreator() {
    const { taskId } = useParams();
    const navigate = useNavigate();

    // Modify state to include description, status, and due_date
    const [subtaskData, setSubtaskData] = useState({
        title: "",
        description: "",
        status: "To Do", // Default status
        due_date: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Construct the request payload based on the new structure
        const response = await fetch(`http://localhost:3000/api/v1/tasks/${taskId}/subtasks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                subtask: {
                    title: subtaskData.title,
                    description: subtaskData.description,
                    status: subtaskData.status,
                    due_date: subtaskData.due_date,
                }
            }),
        });

        if (response.ok) {
            const data = await response.json();
            // Optionally handle the response data here
            alert(`Subtask successfully created: ${data.subtask.title}`);
            navigate("/dashboard");
        } else {
            alert("Error adding subtask");
        }
    };

    return (
        <div>
            <h2>Create Subtask</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Subtask Title"
                    value={subtaskData.title}
                    onChange={(e) => setSubtaskData({ ...subtaskData, title: e.target.value })}
                />
                <textarea
                    placeholder="Description"
                    value={subtaskData.description}
                    onChange={(e) => setSubtaskData({ ...subtaskData, description: e.target.value })}
                />
                <input
                    type="date"
                    value={subtaskData.due_date}
                    onChange={(e) => setSubtaskData({ ...subtaskData, due_date: e.target.value })}
                />
                <button type="submit">Add Subtask</button>
            </form>
        </div>
    );
}

export default SubtaskCreator;
