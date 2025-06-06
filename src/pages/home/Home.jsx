import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getUniqueCategoriesWithQuizzes } from "../../utils/helperfunctions";
import axios from "axios";
import QuizCard from "../../components/quizCard/QuizCard";
import CategoryCard from "../../components/categorycard/CategoryCard";
import HomeNav from "./HomeNav";
import SummaryCard from "../../components/summarycard/SummaryCard";
import QuizIcon from "@mui/icons-material/Quiz";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GroupIcon from "@mui/icons-material/Group";
import BarChartIcon from "@mui/icons-material/BarChart";
import QuizStats from "./QuizStats";
import BasicButton from "../../components/BasicButton";
import "./home.scss";

const serverUrl = import.meta.env.VITE_SERVER_URL;

function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  // ------------ State variables --------------
  const [quizzes, setQuizzes] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeQuizzes, setActiveQuizzes] = useState([]);
  const [filteredQuizzez, setFilteredQuizzez] = useState([]);
  const [visibleQuizzez, setVisibleQuizzez] = useState(3);

  // ---------- Fetch all quizzes from the server -------------
  async function getAllQuizzes() {
    try {
      const allQuizzes = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/quiz`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
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
        `${import.meta.env.VITE_SERVER_URL}/admin/users`,
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
      {/* Quiz management */}
      <section id="quiz-management" className="dashboard-section">
        <div className="dashboard-header">
          <h2 className="dashboard-title"> Quiz Management</h2>
        </div>
        <div className="dashboard-actions">
          <BasicButton
            value="➕ Create Quiz"
            onClick={() => navigate("/create-quiz")}
          />
          <BasicButton
            value="📋 Manage Quizzes"
            onClick={() => navigate("/quizzes")}
          />
          <BasicButton
            value="🗂 Categories"
            onClick={() => navigate("/categories")}
          />
        </div>
      </section>

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
          {/* Display only the first 3 unique categories with quizzes */}
          {getUniqueCategoriesWithQuizzes(filteredQuizzez)
            .slice(0, 3)
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
