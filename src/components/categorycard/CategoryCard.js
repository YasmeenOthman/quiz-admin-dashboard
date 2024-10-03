import React from "react";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import ExtensionIcon from "@mui/icons-material/Extension";
import ScienceIcon from "@mui/icons-material/Science";
import CodeIcon from "@mui/icons-material/Code";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import BrushIcon from "@mui/icons-material/Brush";

import MoneyIcon from "@mui/icons-material/Money";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import "./categorycard.scss";

// Function to select the appropriate icon based on categoryName
const getCategoryIcon = (categoryName) => {
  switch (categoryName.toLowerCase()) {
    case "science":
      return <ScienceIcon sx={{ fontSize: "2rem" }} />;
    case "technology":
      return <DevicesOtherIcon sx={{ fontSize: "2rem" }} />;
    case "art":
      return <BrushIcon sx={{ fontSize: "2rem" }} />;
    case "coding":
      return <CodeIcon sx={{ fontSize: "2rem" }} />;
    case "finance":
      return <MoneyIcon sx={{ fontSize: "2rem" }} />;
    default:
      return <ExtensionIcon sx={{ fontSize: "2rem" }} />; // Default icon
  }
};

const CategoryCard = ({ categoryName, description, quizCount }) => {
  return (
    <div className="category-card-container">
      <div className="category-card-header">
        <div className="category-icon-container">
          {getCategoryIcon(categoryName)}
        </div>
        <h5 className="category-name">{categoryName}</h5>
        <Tooltip title="Add new Quiz">
          <Link
            to={`/create-quiz?category=${categoryName}`}
            className="category-card-add-quiz-link"
          >
            <button className="category-card-add-quiz-button" aria-label="add">
              <AddIcon />
            </button>
          </Link>
        </Tooltip>
        {/* <Tooltip title="Delete Category">
          <Link
            to={`/create-quiz?category=${categoryName}`}
            className="category-card-add-quiz-link"
          >
            <button
              className="category-card-add-quiz-button"
              aria-label="delete"
            >
              <DeleteIcon />
            </button>
          </Link>
        </Tooltip> */}
      </div>

      {description && (
        <p className="category-card-description">{description}</p>
      )}

      <p className="category-card-quiz-count">
        Total Quizzez:{" "}
        <span className="category-card-quiz-count-no">{quizCount}</span>
      </p>
    </div>
  );
};

export default CategoryCard;
