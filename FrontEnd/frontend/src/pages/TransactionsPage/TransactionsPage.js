import React, { useEffect, useState } from "react";
import "./TransactionsPage.css";
import { BASE_URL } from "../../services/AccountServices";

function TransactionsPage() {
  const [searchTrans, setSearchTrans] = useState("");

  useEffect(() => {
    //Code to Search Account per character typed in Search Input
  }, [searchTrans]);

  const handleOnChangeInput = (e) => {
    setSearchTrans(e.target.value);
  };

  return (
    <div className="mainContainerTran">
      <div className="tranSection">
        <div className="leftPaneltran">
          <h2>Transactions</h2>
          <button>+ Add</button>
          <input
            className="searchInputFieldTran"
            type="text"
            placeholder="Search"
            name="search"
            value={searchTrans}
            onChange={handleOnChangeInput}
          ></input>
          <div>Date Range...</div>
          <div>Filter here...</div>
        </div>
        <div className="rightPanelTran">
          {/* Map here - Should also navigate to modal Edit Account */}
          <div className="transListCard">
            <div>Logo and Category</div>
            <div>Account </div>
            <div>Note</div>
            <div>Amount</div>
          </div>
          <div className="transListCard">
            <div>Logo and Category</div>
            <div>Account </div>
            <div>Note</div>
            <div>Amount</div>
          </div>
          <div className="transListCard">
            <div>Logo and Category</div>
            <div>Account </div>
            <div>Note</div>
            <div>Amount</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionsPage;
