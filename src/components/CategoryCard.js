import React from "react";
import { Card, CardContent, Typography, CardActionArea } from "@mui/material";

const CategoryCard = ({ categoryName, description }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
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
    </Card>
  );
};

export default CategoryCard;
