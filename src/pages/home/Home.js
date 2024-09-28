import React, { useEffect, useState } from "react";
import QuizCard from "../../components/QuizCard";
import CategoryCard from "../../components/CategoryCard";
import "./home.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import SummaryCard from "../../components/summarycard/SummaryCard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GroupIcon from "@mui/icons-material/Group";
import BarChartIcon from "@mui/icons-material/BarChart";

const serverUrl = process.env.REACT_APP_SERVER_URL;
function Home() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeQuizzes, setActiveQuizzes] = useState([]);
  const [filteredQuizzez, setFilteredQuizzez] = useState([]);
  const [visibleQuizzez, setVisibleQuizzez] = useState(4);
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
      setFilteredQuizzez(allQuizzes.data);
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

  // Function to delete a quiz by its ID
  const deleteQuiz = async (quizId) => {
    try {
      if (window.confirm("Are you sure you want to delete this quiz?")) {
        await axios.delete(`${serverUrl}/quiz/${quizId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        // Update the state to remove the deleted quiz
        setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
        setFilteredQuizzez(
          filteredQuizzez.filter((quiz) => quiz._id !== quizId)
        );
      }
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-welcome-message">
        Welcome{" "}
        <span className="user-name">
          {decoded && decoded.username?.toUpperCase()}
        </span>
      </h1>
      <div className="home-cards-container">
        <div className="home-cards-subtitle-container">
          <h2 className="home-cards-subtitle">Last Activities:</h2>
        </div>
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
      <div className="last-added-quiz-container">
        <div className="last-added-quiz-subtitle-container">
          <h2 className="last-added-quiz-subtitle">Last Added quizzez</h2>
        </div>
        <div className="last-added-quiz-cards">
          {filteredQuizzez.length === 0 ? (
            <h2>No quizzes found yet</h2>
          ) : (
            filteredQuizzez
              .slice(0, visibleQuizzez) // Show a limited number of quizzes
              .map((quiz) => (
                <QuizCard
                  key={quiz._id}
                  title={quiz.title}
                  description={quiz.description}
                  dateCreated={quiz.dateCreated}
                  createdBy={quiz.createdBy}
                  imageUrl={quiz.imageUrl}
                  quizId={quiz._id}
                  numberOfQuestions={quiz.questions.length}
                  categoryName={quiz.category && quiz.category.name}
                  status={quiz.status}
                  onDelete={() => deleteQuiz(quiz._id)} // Pass the delete function to the QuizCard
                />
              ))
          )}
        </div>
      </div>

      <div className="categories-container">
        <div className="categories-subtitle-container">
          <h2 className="categories-subtitle">
            Recent Categories With Quizzez
          </h2>
        </div>

        <div className="category-cards">
          {filteredQuizzez
            .map((quiz) => quiz.category) // Extract categories from quizzes
            .filter(
              (category, index, self) =>
                category &&
                self.findIndex((cat) => cat.name === category.name) === index
            ) // Filter unique categories
            .slice(0, 4) // Limit to last 4 categories
            .map((category) => (
              <CategoryCard
                key={category._id}
                categoryName={category.name}
                quizCount={category.quizzes.length}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
