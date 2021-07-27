import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import "./register.css";

const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword] = useState("");
  const [password2, setConfirmPassword] = useState("");
  const [referral_code, setReferralCode] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [full_name, setFullName] = useState("");
  const [device_details, setDeviceDetails] = useState({});
  const [location, setLocation] = useState("");

  let history = useHistory()

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_BASE_URL + "api/v1/users/registration/", {
        username,
        email,
        password1,
        password2,
        referral_code,
        phone_number,
        full_name,
        device_details,
        location,
      })
      .then((response) => {
        console.log("RES", response);
        if(response.data.key !== ""){
            history.push('/login')
        }
      })
      .catch((err) => {
        console.log("Err", err.response);
        if (err.response) {
          toast(err.response.data.Error, { type: "error" });
        }
      });
  };

  return (
    <div className="register-form">
      <form className="form" onSubmit={onSubmit}>
          <div className="top-row">
              <h3>Create Account</h3>
              <p>Already have an account? <a href={process.env.REACT_APP_POST_REGISTRATION_URL}>Sign in</a></p>
          </div>
        <div className="input-area">
          <label className="label">Username</label>
          <input
            className="input"
            type="text"
            value={username}
            placeholder="Your Email"
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="input-area">
          <label className="label">Email</label>
          <input
            className="input"
            type="text"
            value={email}
            placeholder="Your Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-area">
          <label className="label">Password</label>
          <input
            className="input"
            type="password"
            value={password1}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-area">
          <label className="label">Confirm password</label>
          <input
            className="input"
            type="password"
            value={password2}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-area">
          <label className="label">Referral code</label>
          <input
            className="input"
            type="text"
            value={referral_code}
            placeholder="not required"
            onChange={(e) => setReferralCode(e.target.value)}
          />
        </div>
        <div className="input-area">
          <label className="label">Phone number</label>
          <input
            className="input"
            type="text"
            value={phone_number}
            placeholder="Your Phone Number"
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="input-area">
          <label className="label">Full name</label>
          <input
            className="input"
            type="text"
            value={full_name}
            placeholder="Your Full Name"
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="input-area">
          <label className="label">Device details</label>
          <textarea
            className="input"
            type="text"
            placeholder="null"
            onChange={(e) => setDeviceDetails({ device: e.target.value })}
            required
          />
        </div>
        <div className="input-area">
          <label className="label">Location</label>
          <input
            className="input"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="register-area">
          <button className="submit-button" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
