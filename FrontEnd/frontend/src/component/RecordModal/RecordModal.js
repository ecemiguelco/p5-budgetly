import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RecordModal.css";
import Flatpickr from "react-flatpickr";
import flatpickr from "flatpickr";
import "flatpickr/dist/themes/dark.css";
import { axiosPostNewRecord, BASE_URL } from "../../services/AccountServices";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

function RecordModal(props) {
  const { isOpen, onClose, children } = props;
  const [transacType, setTransacType] = useState("Expense");
  const [accountName, setSelectedAccName] = useState("Cash");
  const [amount, setAmount] = useState("");
  const [accountsList, setAccountsList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [datePick, setDatePick] = useState("");
  const [note, setNote] = useState("");

  const handleDateChange = (date) => {
    console.log(date);
    setDatePick(date);
  };

  useEffect(() => {
    axios
      .post(BASE_URL + "dashboard", {
        activityType: "getAccountsAndTransactions",
        userID: localStorage.getItem("userID"),
      })
      .then((response) => {
        setAccountsList(response.data.accounts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isOpen]);

  useEffect(() => {
    axios
      .get(BASE_URL + "types")
      .then((response) => {
        setCategories(
          response.data.map((cat) => {
            // console.log(cat);
            return cat.type;
          })
        );
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAddRecord = () => {
    try {
      // console.log(datePick[0]);
      const newTran = {
        activityType: "addTransaction",
        type: transacType,
        accountName: accountName,
        amount: amount,
        category: selectedCategory,
        note: note,
        dateCreated: {
          year: datePick[0].getFullYear(),
          month: datePick[0].getMonth(),
          day: datePick[0].getDate(),
          timeSince: datePick[0].getTime(),
          hour: datePick[0].getHours(),
          minute: datePick[0].getMinutes(),
          seconds: datePick[0].getSeconds(),
        },
        userID: localStorage.getItem("userID"),
      };
      axiosPostNewRecord({ newTran, setSelectedAccName, setTransacType, setAmount, onClose });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeInput = (e) => {
    switch (e.target.name) {
      case "accountName":
        setSelectedAccName(e.target.value);
        break;
      case "amount":
        setAmount(e.target.value);
        break;
      case "types":
        setTransacType(e.target.value);
        break;
      case "category":
        setSelectedCategory(e.target.value);
        break;
      case "transacType":
        setTransacType(e.target.value);
        break;
      default:
        break;
    }
  };

  return isOpen ? (
    <>
      <div className="modalAccBackground">
        <div className="modalContainerRec">
          <div className="upperContainerRec">
            <div className="modalRecHeaderAndClose">
              <span className="accModalHeaderTitle">Add Transaction</span>
              <button
                className="accModalCloseBtn"
                onClick={onClose}
              >
                <CloseRoundedIcon />
              </button>
            </div>
            <div className="modalRecTypeCtn">
              <div className="modalRecType">
                <label htmlFor="typeSelect">Transaction type</label>
                <select
                  name="types"
                  id="typeSelect"
                  className="recTypeSelectDropDown"
                  onChange={handleChangeInput}
                >
                  <option value="">--Select Transaction Type--</option>
                  <option value={"Expense"}>Expense</option>
                  <option value={"Income"}>Income</option>
                  <option value={"Transfer"}>Transfer</option>
                </select>
              </div>
              <div className="modalRecType">
                <label htmlFor="accountN">Account</label>
                <select
                  name="accountName"
                  id="accountN"
                  onChange={handleChangeInput}
                  className="recTypeSelectDropDown"
                >
                  <option value="">--Select Account--</option>
                  {accountsList.map((acc, i) => {
                    return (
                      <option
                        value={acc.accountName}
                        key={i}
                      >
                        {acc.accountName}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="modalAccStartAmount">
              <label htmlFor="amountOfRec">Amount</label>
              <input
                placeholder="0"
                id="amountOfRec"
                name="amount"
                value={amount}
                onChange={handleChangeInput}
              ></input>
            </div>
          </div>
          <div className="lowerContainerRec">
            <div className="modalRecTypeCtn">
              <div className="modalRecType">
                <label htmlFor="cateSelect">Category</label>
                <select
                  name="category"
                  id="cateSelect"
                  onChange={handleChangeInput}
                  className="recTypeSelectDropDown"
                >
                  <option value="">--Choose--</option>
                  {categories.map((cate, i) => {
                    return (
                      <option
                        value={cate}
                        key={i}
                      >
                        {cate}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="modalRecType">
                <label htmlFor="timeStamp">Time and Date</label>
                <Flatpickr
                  options={{
                    enableTime: true,
                    disableMobile: "true",
                    altInput: true,
                    altFormat: "Y F j - H:i",
                    dateFormat: "Y-m-d H:i",
                    defaultHour: new Date().getHours(),
                    defaultMinute: new Date().getMinutes(),
                    onClose: handleDateChange,
                  }}
                  value={datePick}
                  id="timeStamp"
                  className="dateRangePicker datePickRecModal"
                  style={{
                    width: "150px",
                  }}
                />
              </div>
            </div>
            <button
              className="modalAddRecBtn"
              onClick={handleAddRecord}
            >
              Add Record
            </button>
          </div>
        </div>
      </div>
    </>
  ) : null;
}

export default RecordModal;
