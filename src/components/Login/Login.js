import React, { useState } from "react";
import axios from "axios";

import "./login.css";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = () => {
    let clientID = process.env.REACT_APP_CLIENT_ID;
    let clientSecret = process.env.REACT_APP_CLIENT_SECRET;

    axios
      .request({
        method: "post",
        url: "/api/v1/oauth/token/",
        baseURL: "http://fullstack-role.busara.io",
        auth: {
          username: `${clientID}`,
          password: `${clientSecret}`,
        },
        data: `grant_type=password&username=${username}&password=${password}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        console.log("RES", response.data);
      })
      .catch((error) => {
        console.log("ERROR", error.response.data);
      });
  };

  return (
    <div className="login-page">
      <div className="login-input-area">
        <h2 className="login-header">Log In</h2>
        <label className="login-label">Username</label>
        <input
          className="login-input"
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label className="login-label">Password</label>
        <input
          className="login-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-btn" onClick={loginUser}>
          Login
        </button>
        <p>
          Don't have an account?{" "}
          <a href={process.env.REACT_APP_BASE_URL}>Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
