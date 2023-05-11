import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import Currency from "../Currency";

function DoughnutChart(props) {
  const { expenses, startDate, endDate } = props;
  const startDateForData = new Date(startDate);
  const endDateForData = new Date(endDate);

  // the code below filters expenses depending on the date range selected in the dashboard page.
  const expenseData = expenses
    .filter((transac) => transac.dateCreated.timeSince >= startDateForData.getTime())
    .filter((transac) => transac.dateCreated.timeSince <= endDateForData.getTime())
    .reduce((data, expense) => {
      if (expense.type === "Expense") {
        if (!data[expense.category]) {
          data[expense.category] = expense.amount;
        } else {
          data[expense.category] += expense.amount;
        }
      }
      return data;
    }, {});

  const chartData = {
    labels: Object.keys(expenseData),
    datasets: [
      {
        label: "Expenses by Category",
        data: Object.values(expenseData),
        backgroundColor: [
          "rgba(170, 0, 255, 0.6)",
          "#f44336",
          "rgba(255, 206, 86, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "#4fc3f7",
          "rgba(255, 99, 132, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
      },
    ],
  };
  const charOptions = {
    maintainAspectRatio: false,
    responsive: true,
  };

  const totalExpense = Object.values(expenseData).reduce((acc, curr) => acc + curr, 0);

  return (
    <>
      <span>Expenses by Category</span>
      <Doughnut
        data={chartData}
        options={charOptions}
        className="donutChart"
      />
      <span>Total Expense: {<Currency value={totalExpense} />}</span>
    </>
  );
}

export default DoughnutChart;
