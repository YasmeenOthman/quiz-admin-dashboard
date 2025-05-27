import { useState, useEffect } from "react";
import logo from "../../assets/images/logo.png";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import passwordSchema from "./passwordSchema"; // Import the schema
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Tooltip } from "@mui/material";
import BasicButton from "../../components/BasicButton";

const serverUrl = import.meta.env.VITE_SERVER_URL;

const Register = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showCriteria, setShowCriteria] = useState(false);
  const [criteriaFeedback, setCriteriaFeedback] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/");
    }
  }, []);

  // Handle registration
  async function handleSubmit(event) {
    event.preventDefault();

    const isPasswordValid = passwordSchema.validate(password);
    if (!isPasswordValid) {
      alert("Password does not meet criteria. Please fix issues.");
      return;
    }

    try {
      let user = { username, email, password };
      let res = await axios.post(`${serverUrl}/user/register`, user);

      if (res.data.status) {
        alert("Registered successfully!");
        navigate("/quiz-login");
      } else {
        alert(res.data.msg);
      }
    } catch (error) {
      alert(error.response.data.msg);
    }
  }

  // Toggle password visibility
  function toggleVisibility() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  // Update criteria feedback
  function handlePasswordChange(e) {
    const value = e.target.value;
    setPassword(value);
    const criteriaStatus = passwordSchema.validate(value, { details: true });
    const allCriteria = [
      { message: "At least 8 characters", rule: "min" },
      { message: "At most 12 characters", rule: "max" },
      { message: "At least one uppercase letter", rule: "uppercase" },
      { message: "At least one lowercase letter", rule: "lowercase" },
      { message: "No spaces", rule: "spaces" },
      {
        message: "Password must contain at least one symbol @$&?",
        rule: "symbols",
      },
    ];

    const feedback = allCriteria.map((criteria) => ({
      ...criteria,
      valid: !criteriaStatus.some((err) => err.validation === criteria.rule),
    }));

    setCriteriaFeedback(feedback);
  }

  return (
    <div className="shared-form-container">
      <form className="shared-form" onSubmit={handleSubmit}>
        <div className="form-logo">
          <img src={logo} alt="logo" />
        </div>
        <h1 className="form-header">Sign Up!!</h1>
        <div className="shared-inputs">
          <div className="input-container">
            <input
              type="text"
              placeholder="Username..."
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              type="email"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div
            className="input-container"
            onFocus={() => setShowCriteria(true)}
            onBlur={() => setShowCriteria(false)}
          >
            <input
              type={!isPasswordVisible ? "password" : "text"}
              placeholder="Password..."
              value={password}
              onChange={handlePasswordChange}
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
          {showCriteria && (
            <div className="password-criteria">
              {criteriaFeedback.map((criteria, index) => (
                <div
                  key={index}
                  className="criteria-item"
                  style={{ color: criteria.valid ? "green" : "red" }}
                >
                  {criteria.valid ? (
                    <CheckCircleIcon style={{ marginRight: "8px" }} />
                  ) : (
                    <ErrorOutlineIcon style={{ marginRight: "8px" }} />
                  )}
                  {criteria.message}
                </div>
              ))}
            </div>
          )}
        </div>
        <BasicButton
          value="Register"
          onClick={handleSubmit}
          style={{
            backgroundColor: "#04305a",
            color: "#F4F5F7",
            padding: "10px",
            width: "40%",
          }}
        />

        <div className="navigation-msg-container">
          <p className="switching-msg">
            ALREADY HAVE AN ACCOUNT?{" "}
            <Link className="shared-link" to="/quiz-login">
              <span>LOGIN</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
