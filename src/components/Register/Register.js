import React, { useState } from "react";

import './register.css'

function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [deviceDetails, setDeviceDetails] = useState(null);
  const [location, setLocation] = useState("");

  return (
    <div className="register-form">
      <form className="form">
        <div className="input-area">
        <label className="label">Username</label>
        <input className="input" 
        type="text"
        value={userName}
        placeholder="Your Email" 
        />
        </div>
        <div className="input-area">
        <label className="label">Password</label>
        <input className="input" 
        type="text"
        value={email}
        placeholder="Your Email" 
        />
        </div>
        <div className="input-area">
        <label className="label">Password</label>
        <input className="input" 
        type="password"
        value={password}
        />
        </div>
        <div className="input-area">
        <label className="label">Confirm password</label>
        <input className="input" 
        type="password"
        value={confirmPassword}
        />
        </div>
       <div className="input-area">
       <label className="label">Referral code</label>
        <input className="input" 
        type="text"
        value={referralCode}
        />
       </div>
        <div className="input-area">
        <label className="label">Phone number</label>
        <input className="input" 
        type="text"
        value={phoneNumber}
        placeholder="Your Phone Number" 
        />
        </div>
        <div className="input-area">
        <label className="label">Full name</label>
        <input className="input" 
        type="text"
        value={fullName}
        placeholder="Your Full Name" 
        />
        </div>
        <div className="input-area">
        <label className="label">Device details</label>
        <textarea className="input" 
        type="text"
        value={deviceDetails}
        placeholder="null" 
        />
        </div>
        <div className="input-area">
        <label className="label">Location</label>
        <input className="input" 
        type="text"
        value={location}
        />
        </div>
       <div className="register-area">
       <button className="submit-button" type="submit">Register</button>
       </div>
      </form>
    </div>
  );
}

export default Register;
