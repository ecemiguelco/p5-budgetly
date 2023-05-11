import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AccountModal.css";
import { BASE_URL } from "../../services/AccountServices";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

function EditAccModal(props) {
  const { isOpen, onClose, accSelected } = props;
  const [categories, setCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [accountName, setAccountName] = useState("");
  const [currentAmount, setCurrentAmount] = useState(0);
  const [openedAcc, setOpenedAcc] = useState({});

  useEffect(() => {
    axios
      .post(BASE_URL + "dashboard", {
        activityType: "getAccountsAndTransactions",
        userID: localStorage.getItem("userID"),
      })
      .then((response) => {
        // console.log(response.data.accounts);
        // console.log(response.data.accounts.find((acc) => acc.accountName === accSelected));
        setOpenedAcc(response.data.accounts.find((acc) => acc.accountName === accSelected));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleChangeInput = (e) => {
    switch (e.target.name) {
      case "accountName":
        setAccountName(e.target.value);
        break;
      case "currentAmount":
        setCurrentAmount(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleEditAccount = () => {
    try {
      const newAcc = {
        activityType: "addAccount",
        accountName: accountName,
        type: selectedOption,
        currentBalance: currentAmount,
      };
      // axiosPatchAccount({ newAcc, setSelectedOption, setAccountName, setStartingAmount, onClose });
    } catch (err) {
      console.log(err);
    }
  };

  return isOpen ? (
    <>
      <div className="modalAccBackground">
        <div className="modalContainerAcc">
          <div className="modalAccHeaderClose">
            <span>Edit Account</span>
            <button onClick={onClose}>
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
              <label htmlFor="currentAmount">Current Balance</label>
              <input
                placeholder="0"
                id="currentAmount"
                name="currentAmount"
                value={currentAmount}
                onChange={handleChangeInput}
              ></input>
            </div>
          </div>
          <div className="modalAccBtnContainer">
            <button
              className="modalAccBtn"
              onClick={handleEditAccount}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  ) : null;
}

export default EditAccModal;
