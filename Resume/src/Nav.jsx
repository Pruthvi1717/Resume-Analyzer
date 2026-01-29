import { useEffect, useState } from "react";
import "./Nav.css";

const Nav = ({isLoggedIn, setIsLoggedIn, setActiveForm}) => {
  

  
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setActiveForm(null);
    
  }
  
  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div className="nav-left">
        <span className="logo">ResumeAI</span>
      </div>

      {/* Middle: Search */}
      <div className="nav-middle">
        <input
          type="text"
          placeholder="Search jobs, resumes, skills..."
        />
      </div>

      {/* Right: Auth buttons */}
      <div className="nav-right">
        {!isLoggedIn ? (
          <>
            <button className="nav-btn" onClick = {() => setActiveForm("login")}>Login</button>
            <button className="nav-btn outline" onClick = {() => setActiveForm("register")}>Register</button>
          </>
        ) : (
          <button className="nav-btn logout" onClick={handleLogout} >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Nav;
