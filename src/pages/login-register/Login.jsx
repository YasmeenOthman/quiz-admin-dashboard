import { useState, useEffect } from "react";
import "./shared-form.scss";
import logo from "../../assets/images/logo.png";
import axios from "axios";
import BasicButton from "../../components/BasicButton";
import { useNavigate, Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Tooltip } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const serverUrl = import.meta.env.VITE_SERVER_URL;
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
      navigate("/home");
    }
  }, []);

  // Toggle password visibility
  function toggleVisibility() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  // Handle login
  async function handleSubmit(event) {
    try {
      event.preventDefault();
      let user = { email, password };
      let res = await axios.post(`${serverUrl}/user/login`, user);
      if (res.data.status) {
        localStorage.setItem("authToken", res.data.token);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg, toastOptions);
    }
  }

  return (
    <div className="shared-form-container">
      <form className="shared-form" onSubmit={handleSubmit}>
        <div className="form-logo">
          <img src={logo} alt="logo" />
        </div>
        <h1 className="form-header">Welcome Back!!</h1>
        <div className="shared-inputs">
          <div className="input-container">
            <input
              type="email"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-container">
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
            color: "#F4F5F7",
            padding: "10px",
            width: "20%",
          }}
        />

        <div className="navigation-msg-container">
          <p className="switching-msg">
            DO NOT HAVE AN ACCOUNT?{" "}
            <Link className="shared-link" to="/quiz-register">
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
