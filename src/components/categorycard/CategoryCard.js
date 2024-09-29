import React from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip"; // Import Tooltip
import IconButton from "@mui/material/IconButton";
import ExtensionIcon from "@mui/icons-material/Extension";
import BiotechIcon from "@mui/icons-material/Biotech";
import ScienceIcon from "@mui/icons-material/Science";
import CodeIcon from "@mui/icons-material/Code";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import BrushIcon from "@mui/icons-material/Brush";
import MoneyIcon from "@mui/icons-material/Money";

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
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardContent>
        {/* Icon based on category name */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <Box
            sx={{ border: "1px solid black", marginRight: "10px", p: "5px" }}
          >
            {getCategoryIcon(categoryName)}
          </Box>

          <Typography gutterBottom variant="h5" component="div">
            {categoryName}
          </Typography>
        </Box>

        {description && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Total Quizzes: {quizCount}
        </Typography>
      </CardContent>
      <Tooltip title="Add new Quiz">
        <Link to={`/create-quiz?category=${categoryName}`}>
          <IconButton aria-label="add">
            <AddIcon />
          </IconButton>
        </Link>
      </Tooltip>
    </Card>
  );
};

export default CategoryCard;
