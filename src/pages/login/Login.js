// Login.js
import { useState, useEffect } from "react";
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
  position: "bottom-right",
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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <img src="" alt="logo" />
          <h1>Welcome Back!!</h1>
        </div>
        <div>
          <input
            type="email"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div style={{ display: "flex" }}>
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
        <BasicButton value="Login" onClick={handleSubmit} />

        <div>
          <p>
            DO NOT HAVE AN ACCOUNT ?{" "}
            <Link to="/quiz-register">
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
