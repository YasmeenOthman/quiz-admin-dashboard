import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import SummaryCard from "../../components/SummaryCard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GroupIcon from "@mui/icons-material/Group";
import BarChartIcon from "@mui/icons-material/BarChart";
import { Grid } from "@mui/material";

function Home() {
  const navigate = useNavigate();
  const [quizzes, setQuizzez] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeQuizzes, setActiveQuizzez] = useState([]);
  const [averageScore, setAverageScore] = useState(null);
  const [decoded, setDecoded] = useState(null);
  let token = null;

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/quiz-login");
    } else {
      token = localStorage.getItem("authToken");
      setDecoded(jwtDecode(token)); // Decode the JWT token to get user details
    }
  }, []);

  // Function to fetch all quizzes from the server
  // The quizzes are reversed so the latest ones appear first
  async function getAllQuizzez() {
    try {
      const allQuizzez = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/quiz`
      );
      setQuizzez(allQuizzez.data);
      setActiveQuizzez(
        allQuizzez.data.filter((quiz) => quiz.status === "active")
      );
    } catch (error) {
      console.log(error);
    }
  }
  // Function to fetch all registerd users from the server

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
      console.log(error);
    }
  }
  // useEffect hook to fetch all quizzes when the component mounts
  useEffect(() => {
    getAllQuizzez();
    getAllUsers();
  }, []);

  const summaryData = [
    {
      title: "Total Quizzes Created",
      value: quizzes.length,
      Icon: AssignmentIcon,
    },
    {
      title: "Active Quizzes",
      value: activeQuizzes.length,
      Icon: CheckCircleIcon,
    },
    { title: "Total Users", value: users.length, Icon: GroupIcon },
    { title: "Average Score", value: quizzes.length, Icon: BarChartIcon },
  ];
  return (
    <div>
      <h3>Welcome {decoded && decoded.username?.toUpperCase()}</h3>
      <h2>Summary</h2>
      <Grid>
        {summaryData.map((item) => (
          <SummaryCard title={item.title} value={item.value} Icon={item.Icon} />
        ))}
      </Grid>

      <div></div>
    </div>
  );
}

export default Home;
