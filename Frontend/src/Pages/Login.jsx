import React, { useState } from "react";
import "../css/login.css";
import axios from "axios";
import { Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    const payload = { email, password };
    axios
      .post(`http://localhost:5000/user/login`, payload)
      .then((res) => {
        console.log(res.data);
        alert(res.data.msg);
        // navigate("/login")
      })
      .catch((err) => {
        console.log(err.message);
        alert(err.message);
      });
  };

  return (
    <div id="container">
      <div id="login-card">
        {/* <h2>Please Login</h2> */}
        {/* <img src="" alt="" srcset="" /> */}
        <div>
          <form onSubmit={handleLogin}>
            <label>Username</label>
            <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            />
            <br />
            <label>Password</label>
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            />
            <br />
            <button type="submit">Login</button>
          </form>
          <Link to="/resetPass">
            <h5>Forgot password?</h5>
          </Link>
        </div>
      </div>
      <div>
        <p>
          {" "}
          Don't have account? <Link to={"/signup"}>SignUp</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
