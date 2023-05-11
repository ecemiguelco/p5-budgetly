import React, { useState } from "react";
import "./RegisterPage.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../services/AccountServices";

function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const inputName = e.target.name;
    switch (inputName) {
      case "firstName":
        setFirstName(e.target.value);
        break;
      case "lastName":
        setLastName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;

      default:
        break;
    }
  };

  const axiosRegisterUser = async (newUser) => {
    try {
      const res = await axios.post(BASE_URL + "registration", { ...newUser });
      navigate("/login");
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const handleRegisterUserSubmit = (e) => {
    try {
      e.preventDefault();
      const newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };
      console.log(newUser);
      axiosRegisterUser(newUser);
    } catch (err) {
      console.log(err);
    }
  };

  //

  return (
    <div>
      <div className="pageContainer">
        <div className="innerBoxContainer">
          <h2>Create a User Account</h2>
          <p>Sign up below to create your Account</p>
          <form
            className="formContainer"
            onSubmit={handleRegisterUserSubmit}
          >
            <div className="inputContainer">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                value={firstName}
                name="firstName"
                onChange={handleOnChange}
              ></input>
            </div>

            <div className="inputContainer">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                value={lastName}
                name="lastName"
                onChange={handleOnChange}
              ></input>
            </div>
            <div className="inputContainer">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={email}
                name="email"
                onChange={handleOnChange}
              ></input>
            </div>
            <div className="inputContainer">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                value={password}
                name="password"
                onChange={handleOnChange}
              ></input>
            </div>

            <div className="buttonsContainer">
              <button type="submit">Sign Up</button>
              <p>
                Already have an account? <NavLink to="/login">Log In</NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
