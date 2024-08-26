import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";

const CategoryCard = ({ imageUrl, categoryName, description, onClick }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {categoryName}
          </Typography>
          {description && (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CategoryCard;
