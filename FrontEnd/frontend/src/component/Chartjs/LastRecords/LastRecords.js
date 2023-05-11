import React, { useEffect, useState } from "react";
import Currency from "../../Currency";
import axios from "axios";
import "./LastRecords.css";
import { BASE_URL } from "../../../services/AccountServices";

function LastRecords(props) {
  const { transList, startDate, endDate } = props;
  const startDateForData = new Date(startDate);
  const endDateForData = new Date(endDate);
  const [accountNames, setAccountNames] = useState({});
  const [loading, setLoading] = useState(true);
  const [stateTransList, setStateTransList] = useState(
    transList
      .filter((transac) => transac.dateCreated.timeSince >= startDateForData.getTime())
      .filter((transac) => transac.dateCreated.timeSince <= endDateForData.getTime())
      .sort((a, b) => b.dateCreated.timeSince - a.dateCreated.timeSince)
      .slice(0, 5)
  );

  useEffect(() => {
    const filteredTransList = transList
      .filter((transac) => transac.dateCreated.timeSince >= startDateForData.getTime())
      .filter((transac) => transac.dateCreated.timeSince <= endDateForData.getTime())
      .sort((a, b) => b.dateCreated.timeSince - a.dateCreated.timeSince)
      .slice(0, 5);
    setStateTransList(filteredTransList);
  }, [transList]);

  useEffect(() => {
    const accountIDs = stateTransList.map((item) => item.accountID);
    setLoading(true);
    axios
      .post(BASE_URL + "accountnames", { accountIDs })
      .then((response) => {
        // console.log(response.data.accountNames);
        const accountData = response?.data?.accountNames.reduce((acc, curr) => {
          acc[curr._id] = curr.accountName;
          return acc;
        }, {});
        // console.log(accountData);
        setAccountNames(accountData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [stateTransList]);

  return (
    <>
      <div className="lastRecsHeader">
        <span>Latest Transactions</span>
      </div>
      <div className="lastRecsListContainer">
        {loading ? (
          <div>Loading...</div>
        ) : (
          stateTransList?.map((item, i) => (
            <div
              key={i}
              className="recordBoxContainer"
            >
              <div className="cateAndAcc">
                <div className="lastRecCateLabel">{item.category}</div>
                <div className="lastRecAccLabel">{accountNames[item.accountID]}</div>
              </div>
              <div className="ammountAndDate">
                <div className="lastRecAmmount">
                  {item.type === "Expense" ? (
                    <Currency
                      className="expenseRecord"
                      value={-item.amount}
                    />
                  ) : (
                    <Currency
                      className="incomeRecord"
                      value={item.amount}
                    />
                  )}
                </div>
                <div className="lastRecDate">
                  {item?.dateCreated.year}/{item?.dateCreated.month + 1}/{item?.dateCreated.day},
                  {item?.dateCreated.hour}:{item?.dateCreated.minute}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default LastRecords;
