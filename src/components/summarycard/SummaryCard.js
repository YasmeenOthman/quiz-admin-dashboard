import React from "react";
import "./summaryCard.scss";

const SummaryCard = ({ title, value, Icon }) => {
  return (
    <div className="summary-card">
      <div className="card-content">
        <div className="summary-card-icon">
          <Icon />
        </div>
        <div className="summary-card-header">
          <h3 className="summary-card-title">{title}</h3>
        </div>
        <h4 className="summary-card-value">{value}</h4>
      </div>
    </div>
  );
};

export default SummaryCard;
