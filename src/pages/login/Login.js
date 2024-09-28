// Login.js
import { useState, useEffect } from "react";
import "./login.scss";
import axios from "axios";
import BasicButton from "../../components/BasicButton";
import { useNavigate, Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Tooltip } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const serverUrl = process.env.REACT_APP_SERVER_URL;
const toastOptions = {
  position: "top-right",
  autoClose: 5000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/");
    }
  }, []);

  // toggle password visibility
  function toggleVisibility() {
    setIsPasswordVisible(!isPasswordVisible);
  }
  // Login
  async function handleSubmit(event) {
    try {
      event.preventDefault();
      let user = { email, password };
      let res = await axios.post(`${serverUrl}/user/login`, user);
      if (res.data.status) {
        localStorage.setItem("authToken", res.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg, toastOptions);
    }
  }

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-logo">
          <img src="../images/logo.png" alt="logo" />
        </div>
        <h1 className="login-header">Welcome Back!!</h1>
        <div className="login-inputs">
          <div className="email-container">
            <input
              type="email"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="pass-container" style={{ display: "flex" }}>
            <input
              type={!isPasswordVisible ? "password" : "text"}
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isPasswordVisible ? (
              <Tooltip title="Show Password">
                <VisibilityOffIcon onClick={toggleVisibility} />
              </Tooltip>
            ) : (
              <Tooltip title="Hide Password">
                <VisibilityIcon onClick={toggleVisibility} />
              </Tooltip>
            )}
          </div>
        </div>
        <BasicButton
          value="Login"
          onClick={handleSubmit}
          style={{
            backgroundColor: "#04305a",
            color: "#2D9CDB",
            color: "#F4F5F7",
            padding: "10px",
            width: "20%",
          }}
        />

        <div className="login-navigation-msg-container">
          <p className="login-switching-msg">
            DO NOT HAVE AN ACCOUNT ?{" "}
            <Link className="login-link" to="/quiz-register">
              <span>REGISTER</span>
            </Link>
          </p>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
