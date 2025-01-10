import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login/login';
import Register from './components/register/register';
import TaskDashboard from './components/taskDashboard/taskDashboard';
import TaskEditor from './components/taskEditor/taskEditor';
import TaskList from './components/TaskList/TaskList';
import Subtask from './components/subtask/subtask';

function App() {
    // Check if the user is authenticated
    const isAuthenticated = localStorage.getItem('authToken');

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                {/* Auth routes */}
                <Route path="/" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
                <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
                <Route path="/register" element={<Register />} />
                
                {/* Protected routes - only accessible if authenticated */}
                <Route path="/dashboard" element={isAuthenticated ? <TaskDashboard /> : <Navigate to="/login" />} />
                <Route path="/tasks" element={isAuthenticated ? <TaskList /> : <Navigate to="/login" />} />
                <Route path="/edit-task/:id" element={isAuthenticated ? <TaskEditor /> : <Navigate to="/login" />} />
                <Route path="/tasks/:id/edit" element={isAuthenticated ? <TaskEditor /> : <Navigate to="/login" />} />
                <Route path="/tasks/new" element={isAuthenticated ? <TaskEditor /> : <Navigate to="/login" />} />
                <Route path="/tasks/:taskId/subtasks" element={isAuthenticated ? <Subtask /> : <Navigate to="/login" />} />
                <Route path="/add-subtask/:taskId" element={isAuthenticated ? <Subtask /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
