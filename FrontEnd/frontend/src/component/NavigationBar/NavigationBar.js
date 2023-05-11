import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./NavigationBar.css";
import axios from "axios";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { BASE_URL } from "../../services/AccountServices";

function NavigationBar() {
  const [activeUser, setActiveUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post(BASE_URL + "dashboard", {
        activityType: "getUserAccountNames",
        userID: localStorage.getItem("userID"),
      })
      .then((response) => {
        setActiveUser(response.data.userAcc[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const logOuts = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="mainNavCtn">
      <div className="navigationContainer">
        <div className="navLeft">
          <div className="title">
            <NavLink to="/dashboard">
              <div className="iconContainer">
                <AccountBalanceWalletOutlinedIcon fontSize="large" />
              </div>
            </NavLink>
          </div>
          <NavLink
            to="/dashboard"
            className="navBarLinkers"
          >
            Dashboard
          </NavLink>
          <NavLink
            className="navBarLinkers"
            to="/accounts"
          >
            Accounts
          </NavLink>
          <NavLink
            className="navBarLinkers"
            to="/transactions"
          >
            Transactions
          </NavLink>
        </div>
        <div className="navRight">
          <div className="activerUsersNameinNavBar">
            {activeUser.firstName} {activeUser.lastName}
          </div>
          <button
            className="userLogOut"
            onClick={logOuts}
          >
            <LogoutRoundedIcon />
            <div className="logoutLabel"></div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
