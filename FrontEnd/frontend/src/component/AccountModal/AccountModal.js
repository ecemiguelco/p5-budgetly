import React, { useState, useEffect } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import axios from "axios";
import "./AccountModal.css";
import { axiosPostNewAccount, BASE_URL } from "../../services/AccountServices";

function AccountModal(props) {
  const { isOpen, onClose } = props;
  const [categories, setCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [accountName, setAccountName] = useState("");
  const [startingAmount, setStartingAmount] = useState(0);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    axios
      .get(BASE_URL + "categories")
      .then((response) => {
        setCategories(
          response.data.map((cat) => {
            return cat.type;
          })
        );
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAddAccount = () => {
    try {
      const date = new Date();
      const newAcc = {
        activityType: "addAccount",
        accountName: accountName,
        type: selectedOption,
        startingBalance: startingAmount,
        dateCreated: {
          year: date.getFullYear(),
          month: date.getMonth(),
          day: date.getDate(),
          timeSince: date.getTime(),
        },
        userID: localStorage.getItem("userID"),
      };
      axiosPostNewAccount({ newAcc, setSelectedOption, setAccountName, setStartingAmount, onClose });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeInput = (e) => {
    switch (e.target.name) {
      case "accountName":
        setAccountName(e.target.value);
        break;
      case "startingAmount":
        setStartingAmount(e.target.value);
        break;
      default:
        break;
    }
  };

  return isOpen ? (
    <>
      <div className="modalAccBackground">
        <div className="modalContainerAcc">
          <div className="modalAccHeaderClose">
            <span className="accModalHeaderTitle">Add Account</span>
            <button
              onClick={onClose}
              className="accModalCloseBtn"
            >
              <CloseRoundedIcon />
            </button>
          </div>
          <div className="modalAccInputsContainer">
            <div className="modalAccNameColor">
              <label htmlFor="accountName">Name</label>
              <input
                placeholder="Account Name"
                id="accountName"
                name="accountName"
                value={accountName}
                onChange={handleChangeInput}
              ></input>
            </div>
            <div className="modalAccType">
              <label htmlFor="typeSelect">Account type</label>
              <select
                name="types"
                id="typeSelect"
                className="accountTypeSelectDropDown"
                onChange={handleOptionChange}
              >
                <option value="">--Select Account Type--</option>
                {categories.map((cat, i) => {
                  return (
                    <option
                      value={cat}
                      key={i}
                    >
                      {cat}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="modalAccStartAmount">
              <label htmlFor="startAmount">Starting Amount</label>
              <input
                placeholder="0"
                id="startAmount"
                name="startingAmount"
                value={startingAmount}
                onChange={handleChangeInput}
              ></input>
            </div>
          </div>
          <div className="modalAccBtnContainer">
            <button
              className="modalAccBtn"
              onClick={handleAddAccount}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  ) : null;
}

export default AccountModal;
