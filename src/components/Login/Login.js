import React, { useState } from 'react'
import axios  from 'axios';

import './login.css'

const Login = () =>{
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    return(
        <div className="login-page">
            <div className="login-input-area">
                <label className="login-label">Username</label>
                <input 
                className="login-input"
                type="text"
                value={username}
                onChange={e => setUserName(e.target.value)}
                />
                <label className="login-label">Password</label>
                <input 
                className="login-input"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                />
                <button className="login-btn">Login</button>
                <p>Don't have an account? <a href={process.env.REACT_APP_BASE_URL}>Register</a></p>
            </div>
        </div>
    );
}

export default Login;