import * as React from "react";
import Button from "@mui/material/Button";

export default function BasicButton({ value, type, style, onClick }) {
  return (
    <Button
      variant="outlined"
      type={type}
      sx={{
        ...style, // Apply inline styles if provided
        "&:hover": {
          backgroundColor: "#055a8b",
          color: "#FFFFFF",
          border: "1px solid #FFFFFF",
        },
      }}
      onClick={onClick}
    >
      {value}
    </Button>
  );
}
