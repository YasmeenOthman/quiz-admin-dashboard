// pages/QuizManagement.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import QuizCard from "../../components/QuizCard";
import BasicButton from "../../components/BasicButton";
import QuizFilter from "./QuizFilter";
import CategoryCard from "../../components/CategoryCard";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const QuizManagement = () => {
  const navigate = useNavigate();
  const [quizzez, setQuizzez] = useState([]);
  const [filteredQuizzez, setFilteredQuizzez] = useState([]);
  const [visibleQuizzez, setVisibleQuizzez] = useState(4);
  const [decoded, setDecoded] = useState(null);
  let token = null;

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/quiz-login");
    } else {
      token = localStorage.getItem("authToken");
      setDecoded(jwtDecode(token));
    }
  }, []);

  useEffect(() => {
    getAllQuizzez();
  }, []);

  async function getAllQuizzez() {
    try {
      const allQuizzez = await axios.get(`${serverUrl}/quiz`);
      const reversedQuizzes = allQuizzez.data.reverse(); // Reverse the array once
      setQuizzez(reversedQuizzes);
      setFilteredQuizzez(reversedQuizzes);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteQuiz = async (quizId) => {
    try {
      if (window.confirm("Are you sure you want to delete this quiz?")) {
        await axios.delete(`${serverUrl}/quiz/${quizId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setQuizzez(quizzez.filter((quiz) => quiz._id !== quizId));
        setFilteredQuizzez(
          filteredQuizzez.filter((quiz) => quiz._id !== quizId)
        );
      }
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  return (
    <div>
      <h1>Welcome {decoded && decoded.username.toUpperCase()}</h1>
      <h1>Quiz Management</h1>
      <div>
        <Link to="/create-quiz">
          <BasicButton value="Create New Quiz" />
        </Link>
        <Link to="/quizzes">
          <BasicButton value={"Explore All Quizzez"} />
        </Link>
        <Link to="/categories">
          <BasicButton value={"Explore All Categories"} />
        </Link>
      </div>

      <h1>Last Added quizzez</h1>
      <div>
        {filteredQuizzez.length === 0 ? (
          <h2>No quizzes found yet</h2>
        ) : (
          filteredQuizzez
            .slice(0, visibleQuizzez)
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
                onDelete={() => deleteQuiz(quiz._id)}
              />
            ))
        )}
      </div>

      <h2>Recent Categories With Quizzez</h2>
      <div className="category-cards">
        {filteredQuizzez
          .map((quiz) => quiz.category)
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
  );
};

export default QuizManagement;
