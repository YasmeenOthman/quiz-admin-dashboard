// components/BasicButtons.jsx
import * as React from "react";
import Button from "@mui/material/Button";

export default function BasicButton({ value, style, onClick }) {
  return (
    <Button variant="outlined" style={style} onClick={onClick}>
      {value}
    </Button>
  );
}
