import { useState } from "react";
import "./Login.css";
import axios from "axios";

const Login = ({setIsLoggedIn, setActiveForm}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:8080/auth/login", {
      email,
      password,
    });

   

    localStorage.setItem("token", res.data.token);
    setPassword("");
    setEmail("");
    setIsLoggedIn(true)
    setActiveForm(null)
    alert("login successfull");
  };

  return (
    <div className="LoginContainer">

      <h2>Login</h2>
      
      <form onSubmit={handleLogin} className="formcl">
        <div className="Emailname fopar">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Enter email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="Password fopar">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Login</button>
      </form>
      
    </div>
  );
};

export default Login;
