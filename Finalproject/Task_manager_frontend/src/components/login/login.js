import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Login() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the request body based on the formData
        const requestBody = isRegistering
            ? {
                  user: {
                      email: formData.username, // Assuming "username" corresponds to the email now
                      password: formData.password,
                      password_confirmation: formData.password, // Password confirmation for registration
                  },
              }
            : {
                  email: formData.username, // Login expects email and password
                  password: formData.password,
              };

        const endpoint = isRegistering
            ? "http://localhost:3000/api/v1/users"
            : "http://localhost:3000/api/v1/users/login"; // Adjust login API as needed

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();

            if (response.ok) {
                if (isRegistering) {
                    setMessage(data.message || "Registration successful");
                    console.log("Token:", data.token);
                    localStorage.setItem('authToken', data.token); // Store token in localStorage
                    setTimeout(() => navigate("/dashboard"), 2000);
                } else {
                    setMessage("Login successful");
                    console.log("Token:", data.token);
                    localStorage.setItem('authToken', data.token); // Store token in localStorage
                    navigate("/dashboard");
                }
            } else {
                setMessage(data.message || "Error occurred");
            }
        } catch (error) {
            setMessage("Network error");
        }
    };

    return (
        <div>
            <h2>{isRegistering ? "Register" : "Login"}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Email"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button type="submit">{isRegistering ? "Register" : "Login"}</button>
            </form>
            <button onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? "Switch to Login" : "Switch to Register"}
            </button>
            {message && <p>{message}</p>}
        </div>
    );
}

Login.propTypes = {};

Login.defaultProps = {};

export default Login;