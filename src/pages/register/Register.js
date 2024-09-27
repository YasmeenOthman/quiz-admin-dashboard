// Login.js
import { useState, useEffect } from "react";
import "./register.scss";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import BasicButton from "../../components/BasicButton";
import { Tooltip } from "@mui/material";

const toastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

const serverUrl = process.env.REACT_APP_SERVER_URL;
const Register = ({}) => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/");
    }
  }, []);

  // ----- sign up -----
  async function handleSubmit(event) {
    try {
      event.preventDefault();
      let user = { username, email, password };
      let res = await axios.post(`${serverUrl}/user/register`, user);

      if (res.data.status) {
        toast.success("Registerd successfully !", {
          toastOptions,
          onClose: () => {
            navigate("/quiz-login");
          },
        });
      } else {
        toast.error(res.data.msg);
      }
    } catch (error) {
      toast.error(error.response.data.msg, toastOptions);
    }
  }

  // ---- toggle password visibility ----
  function toggleVisibility() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  return (
    <div className="register-form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-logo">
          <img src="../images/logo.png" alt="logo" />
        </div>
        <h1>Sign Up!!</h1>
        <div className="register-inputs">
          <div className="email-container">
            <input
              type="text"
              placeholder="Username..."
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
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
          value="Register"
          onClick={handleSubmit}
          style={{
            backgroundColor: "#04305a",
            color: "#2D9CDB",
            color: "#F4F5F7",
            padding: "10px",
            width: "20%",
          }}
        />

        <div className="register-navigation-msg-container">
          <p className="register-switching-msg">
            ALREADY HAVE AN ACCOUNT ?{" "}
            <Link className="register-link" to="/quiz-login">
              <span>LOGIN</span>
            </Link>
          </p>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
