import React from "react";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import ExtensionIcon from "@mui/icons-material/Extension";
import ScienceIcon from "@mui/icons-material/Science";
import CodeIcon from "@mui/icons-material/Code";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import BrushIcon from "@mui/icons-material/Brush";
import MoneyIcon from "@mui/icons-material/Money";
import Tooltip from "@mui/material/Tooltip";
import "./categorycard.scss";

// Function to select the appropriate icon based on categoryName
const getCategoryIcon = (categoryName) => {
  switch (categoryName.toLowerCase()) {
    case "science":
      return <ScienceIcon />;
    case "technology":
      return <DevicesOtherIcon />;
    case "art":
      return <BrushIcon />;
    case "coding":
      return <CodeIcon />;
    case "finance":
      return <MoneyIcon />;
    default:
      return <ExtensionIcon />; // Default icon
  }
};

const CategoryCard = ({ categoryName, description, quizCount }) => {
  return (
    <div className="card-container">
      <div className="card-header">
        <div className="icon-container">{getCategoryIcon(categoryName)}</div>
        <h5>{categoryName}</h5>
      </div>

      {description && <p className="description">{description}</p>}

      <p className="quiz-count">Total Quizzes: {quizCount}</p>
      <Tooltip title="Add new Quiz">
        <Link
          to={`/create-quiz?category=${categoryName}`}
          className="add-quiz-link"
        >
          <button className="add-quiz-button" aria-label="add">
            <AddIcon />
          </button>
        </Link>
      </Tooltip>
    </div>
  );
};

export default CategoryCard;
