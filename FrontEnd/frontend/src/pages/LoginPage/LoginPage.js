import React, { useState } from "react";
import "./LoginPage.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../services/AccountServices";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const inputName = e.target.name;
    switch (inputName) {
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

  // console.log(firstName, lastName, email, password);

  const handleLogin = () => {
    axios
      .post(BASE_URL + "login", {
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token-auth", response.data.token);
        localStorage.setItem("userID", response.data.userID);
        navigate("/dashboard");
      })
      .catch((err) => {
        localStorage.removeItem("token-auth");
        localStorage.removeItem("userID");
      });
  };

  return (
    <div>
      <div className="pageContainer">
        <div className="innerBoxContainer">
          <h2>Log in</h2>
          <div className="formContainer">
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
              <button onClick={handleLogin}>Login</button>
            </div>
            <p>
              Don't have an account? <NavLink to="/registration">Sign Up</NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
