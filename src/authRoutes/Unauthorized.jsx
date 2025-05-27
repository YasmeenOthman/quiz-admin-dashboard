import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    localStorage.removeItem("authToken");
    navigate("/quiz-login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        This email does not have an admin access.
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Please login with your admin email.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLoginRedirect}
        sx={{ marginTop: 2 }}
      >
        Go to Login Page
      </Button>
    </Box>
  );
};

export default Unauthorized;
