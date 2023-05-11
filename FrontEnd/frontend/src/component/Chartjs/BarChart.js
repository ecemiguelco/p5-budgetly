import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import Currency from "../Currency";

function BarChart(props) {
  const { transList, startDate, endDate } = props;
  const startDateForData = new Date(startDate);
  const endDateForData = new Date(endDate);

  const expenseData = transList
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

  const incomeData = transList
    .filter((transac) => transac.dateCreated.timeSince >= startDateForData.getTime())
    .filter((transac) => transac.dateCreated.timeSince <= endDateForData.getTime())
    .reduce((data, income) => {
      if (income.type === "Income") {
        if (!data[income.category]) {
          data[income.category] = income.amount;
        } else {
          data[income.category] += income.amount;
        }
      }
      return data;
    }, {});

  const data = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Cash Flow",
        backgroundColor: ["#32a852", "#d93025"],
        borderColor: ["#32a852", "#d93025"],
        borderWidth: 0.5,
        barThickness: 33,
        hoverBackgroundColor: ["#269f45", "#c8291f"],
        hoverBorderColor: ["#269f45", "#c8291f"],
        indexAxis: "y",
        data: [
          Object.values(incomeData).reduce((acc, curr) => acc + curr, 0),
          Object.values(expenseData).reduce((acc, curr) => acc + curr, 0),
          0,
          {},
        ],
      },
    ],
  };

  const options = {
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            callback: (value, index, values) => {
              return value.toString();
            },
          },
        },
      ],
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const label = data.labels[tooltipItem.index];
          const value = data.datasets[0].data[tooltipItem.index];
          return `${label}: ${value}`;
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <>
      <span>
        Cash Flow:
        <Currency
          value={
            Object.values(incomeData).reduce((acc, curr) => acc + curr, 0) -
            Object.values(expenseData).reduce((acc, curr) => acc + curr, 0)
          }
        />
      </span>
      <Bar
        data={data}
        options={options}
        height={140}
        className="barChart"
      />
    </>
  );
}

export default BarChart;
