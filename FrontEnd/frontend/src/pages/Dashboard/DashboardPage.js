import React, { useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./DashboardPage.css";
import AccountModal from "../../component/AccountModal/AccountModal";
import Currency from "../../component/Currency";
import axios from "axios";
import Flatpickr from "react-flatpickr";
import flatpickr from "flatpickr";
import "flatpickr/dist/themes/dark.css";
import DoughnutChart from "../../component/Chartjs/DoughnutChart";
import RecordModal from "../../component/RecordModal/RecordModal";
import BarChart from "../../component/Chartjs/BarChart";
import LastRecords from "../../component/Chartjs/LastRecords/LastRecords";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { BASE_URL } from "../../services/AccountServices";

function DashboardPage() {
  const [dateRange, setDateRange] = useState([
    new Date(new Date().getFullYear(), new Date().getMonth(), 1, 0, 0, 0),
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59),
  ]);
  const [preloadingRange, setPreloadingRange] = useState([]);

  useEffect(() => {
    // Set preloading range to current month

    setPreloadingRange([
      new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59),
    ]);
  }, []);

  const handleDateChange = (date) => {
    if (date.length > 1) {
      date[1].setHours(23, 59, 59);
    }
    setDateRange(date);
  };

  const [openModal, setOpenModal] = useState(false);
  const [openRecModal, setOpenRecModal] = useState(false);
  const [accountsList, setAccountsList] = useState([]);
  const [transList, setTransList] = useState([]);

  useEffect(() => {
    axios
      .post(BASE_URL + "dashboard", {
        activityType: "getAccountsAndTransactions",
        userID: localStorage.getItem("userID"),
      })
      .then((response) => {
        setAccountsList(response.data.accounts);
        setTransList(response.data.transactions);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [openModal, dateRange, openRecModal]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenRecModal = () => {
    setOpenRecModal(true);
  };

  const handleCloseRecModal = () => {
    setOpenRecModal(false);
  };

  return (
    <div className="mainContainer">
      <div className="accountsSection">
        <div className="accountsContainer">
          {accountsList?.map((acc, i) => {
            return (
              <div
                className="accountDetailsBox"
                key={i}
              >
                <div className="accountDisplayNameDash">{acc.accountName}</div>
                <div className="accountDisplayBalanceDash">
                  <Currency value={acc.currentBalance} />
                </div>
              </div>
            );
          })}

          <button
            className="addAccBtn"
            onClick={handleOpenModal}
          >
            <AddCircleRoundedIcon />
            Add Account
          </button>
          <AccountModal
            isOpen={openModal}
            onClose={handleCloseModal}
          />
        </div>
      </div>
      <div className="widgetSection">
        <div className="headerDateRange">
          <Flatpickr
            options={{
              mode: "range",
              altInput: true,
              altFormat: "Y F j",
              dateFormat: "Y-m-d",
              defaultDate: preloadingRange,
              defaultHour: 23,
              defaultMinute: 59,
            }}
            value={dateRange}
            onChange={handleDateChange}
            className="dateRangePicker"
          />

          <button
            className="addRecBtn"
            onClick={handleOpenRecModal}
          >
            Add Transaction
          </button>
          <RecordModal
            isOpen={openRecModal}
            onClose={handleCloseRecModal}
          />
        </div>

        <div className="widgetsContainer">
          <div className="widgetsCard">
            <DoughnutChart
              expenses={transList}
              startDate={dateRange[0]}
              endDate={dateRange[1]}
            />
          </div>
          <div className="widgetsCard">
            <BarChart
              transList={transList}
              startDate={dateRange[0]}
              endDate={dateRange[1]}
            />
          </div>

          <div className="widgetsCard">
            <LastRecords
              transList={transList}
              startDate={dateRange[0]}
              endDate={dateRange[1]}
            />
          </div>

          <button className="widgetsCardAdd">
            <AddCircleRoundedIcon fontSize="large" />
            Add Card
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
