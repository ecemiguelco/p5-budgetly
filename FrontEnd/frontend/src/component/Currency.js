import React from "react";

function Currency(props) {
  const { value, className } = props;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  });

  return <span className={className}>{formatter.format(value)}</span>;
}

export default Currency;
