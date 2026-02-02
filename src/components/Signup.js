import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


export const Signup = (props) => {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { name, email, password ,cpassword} = credentials;
            if (password !== cpassword) {
                props.showAlert("Passwords do not match!", "danger");
                return; 
            }

            const response = await fetch("http://localhost:5000/api/auth/createuser", {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            const json = await response.json();
            console.log(json);

            if (json.success) {
                // Auth token ko localStorage mein save karein
                localStorage.setItem('token', json.authtoken);

                // Redirect karne ke liye navigate() ka use karein (v6/v7 syntax)
                navigate("/");
                props.showAlert("Account created successfully", "success");
            } else {
                props.showAlert("invalid credentials", "danger");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("Server error, please try again later.");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }




    return (
        <div className="container mt-3">
            <h2 className="my-3">Create an Account to use iNotebook </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}
export default Signup