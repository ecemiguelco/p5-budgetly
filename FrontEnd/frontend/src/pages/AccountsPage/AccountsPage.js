import React, { useEffect, useState } from "react";
import "./AccountsPage.css";
import { BASE_URL } from "../../services/AccountServices";
import axios from "axios";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import AccountModal from "../../component/AccountModal/AccountModal";
import Currency from "../../component/Currency";
import EditAccModal from "../../component/AccountModal/EditAccModal";

function AccountsPage() {
  const [searchAcc, setSearchAcc] = useState("");
  const [activeUserID, setActiveUserID] = useState(localStorage.getItem("userID"));
  const [activeAccList, setActiveAccList] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    axios
      .post(BASE_URL + "dashboard", {
        activityType: "getAccountsAndTransactions",
        userID: activeUserID,
      })
      .then((response) => {
        setActiveAccList(response.data.accounts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [openModal]);

  const handleOnChangeInput = (e) => {
    setSearchAcc(e.target.value);
  };

  return (
    <div className="mainContainerAcc">
      <div className="accountSection">
        <div className="leftPanel">
          <h2>Accounts</h2>
          <button
            className="addAccBtnAccPage"
            onClick={handleOpenModal}
          >
            <AddCircleRoundedIcon />
            Add Account
          </button>
          <AccountModal
            isOpen={openModal}
            onClose={handleCloseModal}
          />
          <input
            className="searchInputFieldAcc"
            type="text"
            placeholder="
           Account Search..."
            name="search"
            value={searchAcc}
            onChange={handleOnChangeInput}
          ></input>
        </div>
        <div className="rightPanel">
          {activeAccList.length ? (
            activeAccList.map((acc) => {
              return (
                <div
                  className="accountsListCard"
                  onClick={handleOpenModal}
                >
                  <EditAccModal
                    isOpen={openModal}
                    onClose={handleCloseModal}
                    accSelected={acc.accountName}
                  />
                  <div className="detsCtnAccPage">{acc.accountName}</div>
                  <div className="detsCtnAccPage">{acc.type}</div>
                  <div className="detsCtnAccPage">
                    <Currency value={acc.currentBalance} />
                  </div>
                </div>
              );
            })
          ) : (
            <h3>No accounts to display... </h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountsPage;
