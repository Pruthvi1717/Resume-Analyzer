import { useState } from "react";
import axios from "axios";
import { StatusCodes } from "http-status-codes";
import "./Register.css";

const Register = ({ setActiveForm }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/auth/register", {
        name,
        email,
        password,
      });

      alert("Registered successfully");

      // Reset only on success
      setName("");
      setEmail("");
      setPassword("");
      setError("");
      setActiveForm(null);

    } catch (err) {
      if (err.response?.status === StatusCodes.CONFLICT) {
        setError(err.response.data.message); // Email already exists
      } else {
        setError("Server error. Try again later.");
      }
    }
  };

  return (
    <div className="RegisterContainer">
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
        <div className="form-cont">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter the name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            required
          />
        </div>

        <div className="form-cont">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Enter the email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            required
          />
        </div>

        <div className="form-cont">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter the password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            required
          />
        </div>

        <button type="submit">Sign up</button>
      </form>

      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default Register;
