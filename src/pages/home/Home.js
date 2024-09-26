import React, { useEffect, useState } from "react";
import "./home.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import SummaryCard from "../../components/summarycard/SummaryCard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GroupIcon from "@mui/icons-material/Group";
import BarChartIcon from "@mui/icons-material/BarChart";

function Home() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeQuizzes, setActiveQuizzes] = useState([]);
  const [decoded, setDecoded] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/quiz-login");
    } else {
      const decodedToken = jwtDecode(token);
      setDecoded(decodedToken); // Decode the JWT token to get user details
      const expirationDate = decodedToken.exp * 1000; // Convert exp to milliseconds
      if (Date.now() >= expirationDate) {
        localStorage.removeItem("authToken");
        navigate("/quiz-login");
      }
    }
  }, [navigate]);

  // Function to fetch all quizzes from the server
  async function getAllQuizzes() {
    try {
      const allQuizzes = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/quiz`
      );
      setQuizzes(allQuizzes.data);
      setActiveQuizzes(
        allQuizzes.data.filter((quiz) => quiz.status === "active")
      );
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // Token expired or invalid
        localStorage.removeItem("authToken");
        navigate("/quiz-login");
      }
      console.log(error);
    }
  }

  // Function to fetch all registered users from the server
  async function getAllUsers() {
    try {
      const users = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/admin/users`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setUsers(users.data.filter((user) => user.role === "student"));
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // Token expired or invalid
        localStorage.removeItem("authToken");
        navigate("/quiz-login");
      }
      console.log(error);
    }
  }

  // useEffect hook to fetch all quizzes and users when the component mounts
  useEffect(() => {
    getAllQuizzes();
    getAllUsers();
  }, []);

  const summaryData = [
    {
      title: "Total Quizzes ",
      value: quizzes.length,
      Icon: AssignmentIcon,
    },
    {
      title: "Active Quizzes",
      value: activeQuizzes.length,
      Icon: CheckCircleIcon,
    },
    { title: "Total Users", value: users.length, Icon: GroupIcon },
    { title: "Average Score", value: 0, Icon: BarChartIcon },
  ];

  return (
    <div className="home-container">
      <h1 className="home-welcome-message">
        Welcome {decoded && decoded.username?.toUpperCase()}
      </h1>
      <h2 className="home-cards-subtitle">Last Activities:</h2>
      <div className="home-stats-cards" style={{ display: "flex" }}>
        {summaryData.map((item, index) => (
          <SummaryCard
            key={index}
            title={item.title}
            value={item.value}
            Icon={item.Icon}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
