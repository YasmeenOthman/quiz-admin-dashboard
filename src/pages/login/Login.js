// Login.js
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import BasicButton from "../../components/BasicButton";

const toastOptions = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

const Login = ({}) => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/admin");
    }
  }, []);

  // Login

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      let admin = { username, password };
      let res = await axios.post(
        "http://localhost:3636/auth/admin/signin",
        admin
      );
      if (res.data.status) {
        localStorage.setItem("authToken", res.data.token);
        navigate("/admin");
      }
    } catch (error) {
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
            type="text"
            placeholder="Username..."
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />

          <input
            type={!isPasswordVisible ? "password" : "text"}
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showPassword={showPassword}
            onIconClick={() => setShowPassword(!showPassword)}
            icon={
              isPasswordVisible ? (
                <VisibilityIcon
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              ) : (
                <VisibilityOffIcon
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              )
            }
          />
        </div>
        <BasicButton value="Login" onClick={handleSubmit} />

        <div>
          <p>
            DO NOT HAVE AN ACCOUNT ?{" "}
            <Link to="/register">
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
