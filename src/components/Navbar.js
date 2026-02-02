import React, { useEffect } from 'react'
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


function Navbar(props) {
  let location = useLocation();
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the session
    props.showAlert("Logged out successfully", "success");
    navigate("/");  
                 // Redirect to login
  }
  return (
    <div>
      <nav className="navbar  navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">iNoteBook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {/* <Link className={`nav-link ${location.pathname === "/home" ? "active" : ""}`} aria-current="page" to="/">Home</Link> */}
              </li>
              {/* <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} aria-current="page" to="/about">About</Link>


              </li> */}

            </ul>

            {!localStorage.getItem('token') ? (
            <div className="d-flex ms-auto">
              <Link className="btn btn-primary mx-1" to="/" role="button">Login</Link>
              <Link className="btn btn-primary mx-1" to="/signup" role="button">SignUp</Link>
            </div>
          ) : (
            /* If token IS present, show only Logout */
            <div className=" ms-auto">
            <button onClick={handleLogout} className="btn btn-danger mx-1" disabled={!localStorage.getItem('token')}>Logout</button></div>
          )}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar