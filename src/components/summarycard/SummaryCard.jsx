import React from "react";
import "./summaryCard.scss";

const SummaryCard = ({ title, value, Icon, gradient }) => {
  return (
    <div className="summary-card" style={{ background: gradient }}>
      <div className="card-content">
        <div className="summary-card-header">
          <h3 className="summary-card-value">{value}</h3>
          <h4 className="summary-card-title">{title}</h4>
        </div>
        <div className="summary-card-icon">
          <Icon />
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
