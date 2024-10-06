import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import QuizCard from "../../components/QuizCard";
import CategoryCard from "../../components/categorycard/CategoryCard";
import HomeNav from "./HomeNav";
import SummaryCard from "../../components/summarycard/SummaryCard";
import "./home.scss";
import QuizIcon from "@mui/icons-material/Quiz";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GroupIcon from "@mui/icons-material/Group";
import BarChartIcon from "@mui/icons-material/BarChart";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import QuizStats from "./QuizStats";

const serverUrl = process.env.REACT_APP_SERVER_URL;

function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  // ------------ State variables --------------
  const [quizzes, setQuizzes] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeQuizzes, setActiveQuizzes] = useState([]);
  const [filteredQuizzez, setFilteredQuizzez] = useState([]);
  const [visibleQuizzez, setVisibleQuizzez] = useState(3);

  // --------- User authentication and token handling ------------
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/quiz-login");
    } else {
      const decodedToken = jwtDecode(token);
      const expirationDate = decodedToken.exp * 1000;
      if (Date.now() >= expirationDate) {
        localStorage.removeItem("authToken");
        alert("Session expired ,please login again ");
        navigate("/quiz-login");
      }
    }
  }, [navigate]);

  // ---------- Fetch all quizzes from the server -------------
  async function getAllQuizzes() {
    try {
      const allQuizzes = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/quiz`
      );

      const reversedQuiz = allQuizzes.data.reverse();
      setQuizzes(reversedQuiz);
      setFilteredQuizzez(allQuizzes.data);
      setActiveQuizzes(
        allQuizzes.data.filter((quiz) => quiz.status === "active")
      );
    } catch (error) {
      if (error.response && error.response.status === 403) {
        localStorage.removeItem("authToken");
        navigate("/quiz-login");
      }
      console.log(error);
    }
  }

  // ------------- Fetch all registered users from the server -------------
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
        localStorage.removeItem("authToken");
        navigate("/quiz-login");
      }
      console.log(error);
    }
  }

  // ------------- Fetch quizzes and users when component mounts -------------
  useEffect(() => {
    getAllQuizzes();
    getAllUsers();
  }, []);

  // --------------- Summary data for statistics cards --------------
  const summaryData = [
    {
      id: 1,
      title: "Total Quizzes",
      value: quizzes.length,
      Icon: QuizIcon,
      gradient: "linear-gradient(to left, #FF7E5F, #FEB47B)",
      // gradient: "linear-gradient(to left, #FFEDD5, #FFD1DC)",
    },
    {
      id: 2,
      title: "Active Quizzes",
      value: activeQuizzes.length,
      Icon: CheckCircleIcon,
      gradient: "linear-gradient(to left, #4b46a8,#43C6AC)",
      // gradient: "linear-gradient(to left, #E3FDFD,#43C6AC)",
    },
    {
      id: 3,
      title: "Total Students",
      value: users.length,
      Icon: GroupIcon,
      gradient: "linear-gradient(to left, #6A82FB, #FC5C7D)",
      // gradient: "linear-gradient(to left, #E0C3FC, #8EC5FC)",
    },
    {
      id: 4,
      title: "Highest Score",
      value: 0,
      Icon: BarChartIcon,
      // gradient: "linear-gradient(to left, #FDC830, #F37335)",
      gradient: "linear-gradient(to left, #D4FC79, #96E6A1)",
    },
  ];

  // ------------- Delete quiz by ID ----------------
  const deleteQuiz = async (quizId) => {
    try {
      if (window.confirm("Are you sure you want to delete this quiz?")) {
        await axios.delete(`${serverUrl}/quiz/${quizId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
        setFilteredQuizzez(
          filteredQuizzez.filter((quiz) => quiz._id !== quizId)
        );
      }
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  // ---------- Scroll to section when URL hash changes -------------
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1)); // remove the #
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  // ------------------------------------------------------------------

  return (
    <div className="home-container">
      <HomeNav />
      {/* Stats Section */}
      <div id="stats" className="home-cards-container">
        <div className="home-cards-subtitle-container">
          {/* <h2 className="home-cards-subtitle">Last Activities:</h2> */}
        </div>
        <div className="home-stats-cards">
          {summaryData.map((item, index) => (
            <SummaryCard
              key={item.id}
              title={item.title}
              value={item.value}
              Icon={item.Icon}
              gradient={item.gradient}
            />
          ))}
        </div>
      </div>
      <QuizStats quizzes={quizzes} />
      {/* Last Added Quizzes Section */}
      <div id="last-added-quizzes" className="last-added-quiz-container">
        <div className="last-added-quiz-subtitle-container">
          <h2 className="last-added-quiz-subtitle">Recent Added Quizzez</h2>
        </div>
        <div className="last-added-quiz-cards">
          {filteredQuizzez.length === 0 ? (
            <h2>No quizzes found yet</h2>
          ) : (
            filteredQuizzez
              .slice(0, visibleQuizzez)
              .map((quiz) => (
                <QuizCard
                  key={quiz._id}
                  title={quiz.title}
                  dateCreated={quiz.dateCreated}
                  createdBy={quiz.createdBy}
                  imageUrl={quiz.imageUrl}
                  quizId={quiz._id}
                  numberOfQuestions={quiz.questions.length}
                  description={quiz.description}
                  categoryName={quiz.category && quiz.category.name}
                  status={quiz.status}
                  onDelete={() => deleteQuiz(quiz._id)}
                />
              ))
          )}
        </div>
      </div>

      {/* Categories Section */}
      <div id="categories" className="home-categories-container">
        <div className="categories-subtitle-container">
          <h2 className="categories-subtitle">
            Recent Categories With Quizzez
          </h2>
        </div>
        <div className="category-cards">
          {filteredQuizzez
            .map((quiz) => quiz.category)
            .filter(
              (category, index, arr) =>
                category &&
                category.quizzes.length > 0 &&
                arr.findIndex((cat) => cat.name === category.name) === index
            )
            .slice(0, 4)
            .map((category) => (
              <CategoryCard
                key={category._id}
                categoryName={category.name}
                quizCount={category.quizzes.length}
              />
            ))}
        </div>
      </div>
      {/* <ArrowUpwardIcon /> */}
    </div>
  );
}

export default Home;
