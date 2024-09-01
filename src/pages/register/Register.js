// Login.js
import { useState, useEffect } from "react";
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
  autoClose: 8000,
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

  // Register

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      let user = { username, email, password };
      let res = await axios.post(`${serverUrl}/user/register`, user);
      console.log(res.data);
      if (res.data.status) {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.msg, toastOptions);
    }
  }

  function toggleVisibility() {
    setIsPasswordVisible(!isPasswordVisible);
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
            type="text"
            placeholder="Username..."
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
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
                <VisibilityIcon onClick={toggleVisibility} />
              </Tooltip>
            ) : (
              <Tooltip title="Hide Password">
                <VisibilityOffIcon onClick={toggleVisibility} />
              </Tooltip>
            )}
          </div>
        </div>
        <BasicButton value="Register" onClick={handleSubmit} />

        <div>
          <p>
            DO NOT HAVE AN ACCOUNT ?{" "}
            <Link to="/quiz-login">
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
