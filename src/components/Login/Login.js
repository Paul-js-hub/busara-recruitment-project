import React, { useState } from "react";
import { useHistory,Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import "./login.css";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  const getUserProfile =() =>{
    const access_token = localStorage.getItem("access_token");
    axios.get("http://fullstack-role.busara.io/api/v1/users/current-user/", {
      headers:{
        Authorization: `Bearer ${access_token}`,
      }
    })
    .then((response)=>{
      let userID = response.data.id;
      localStorage.setItem("userID", userID)
    })
    history.push("/forms")
  }

  const loginUser = () => {
    let clientID = process.env.REACT_APP_CLIENT_ID;
    let clientSecret = process.env.REACT_APP_CLIENT_SECRET;

    axios
      .request({
        method: "post",
        url: "/api/v1/oauth/token/",
        baseURL: "http://fullstack-role.busara.io",
        auth: {
          username: clientID,
          password: clientSecret,
        },
        data: `grant_type=password&username=${username}&password=${password}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        //console.log("RES", response.data);
        const access_token = response.data.access_token;
        localStorage.setItem("access_token", access_token);
        if(access_token !== ""){
            getUserProfile()
        }
      })
      .catch((err) => {
        if(err.response){
            toast(err.response.data.error)
        }
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
          <Link to="/">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
