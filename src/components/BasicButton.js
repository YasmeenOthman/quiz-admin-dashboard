// components/BasicButtons.jsx
import * as React from "react";
import Button from "@mui/material/Button";

export default function BasicButton({ value, type, style, onClick }) {
  return (
    <Button
      variant="outlined"
      type={type}
      style={
        style
          ? style
          : {
              background: "#2D9CDB",
              color: "#F4F5F7",
              border: "1px solid #F4F5F7",
            }
      }
      onClick={onClick}
    >
      {value}
    </Button>
  );
}
