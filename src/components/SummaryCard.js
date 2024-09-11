import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

const SummaryCard = ({ title, value, Icon }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <Box
            sx={{ border: "1px solid #1976d2", marginRight: "10px", p: "5px" }}
          >
            <Icon sx={{ fontSize: 25, color: "rgba(0, 0, 0, 0.54)" }} />
          </Box>

          <Typography variant="h6" color="textSecondary">
            {title}
          </Typography>
        </Box>

        <Typography variant="h4" color="text.primary">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
