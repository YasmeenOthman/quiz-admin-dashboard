// components/BasicButtons.jsx
import * as React from "react";
import Button from "@mui/material/Button";

export default function BasicButton({ value, type, style, onClick }) {
  return (
    <Button variant="outlined" type={type} style={style} onClick={onClick}>
      {value}
    </Button>
  );
}
