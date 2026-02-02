import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    // 🔹 Auto redirect if token already exists
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/home');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password
                })
            });

            const json = await response.json();
            console.log(json);

            if (json.success) {
                localStorage.setItem('token', json.authtoken);
                navigate("/home");
                props.showAlert("Logged in successfully", "success");
            } else {
                props.showAlert("Invalid credentials", "danger");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("Server error, please try again later.");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Login to your account</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        value={credentials.email}
                        onChange={onChange}
                        name="email"
                        id="email"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={credentials.password}
                        onChange={onChange}
                        name="password"
                        id="password"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default Login;
