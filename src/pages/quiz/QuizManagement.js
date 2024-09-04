// pages/QuizManagement.jsx

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import QuizCard from "../../components/QuizCard";
import BasicButton from "../../components/BasicButton";
import CategoryCard from "../../components/CategoryCard";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const QuizManagement = () => {
  const navigate = useNavigate();
  const [quizzez, setQuizzez] = useState([]);
  const [filteredQuizzez, setFilteredQuizzez] = useState([]);
  const [visibleQuizzez, setVisibleQuizzez] = useState(4);
  const [decoded, setDecoded] = useState(null);
  let token = null;

  // useEffect hook to check for authentication token
  // If token is missing, the user is redirected to the login page
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/quiz-login");
    } else {
      token = localStorage.getItem("authToken");
      setDecoded(jwtDecode(token)); // Decode the JWT token to get user details
    }
  }, []);

  // useEffect hook to fetch all quizzes when the component mounts
  useEffect(() => {
    getAllQuizzez();
  }, []);

  // Function to fetch all quizzes from the server
  // The quizzes are reversed so the latest ones appear first
  async function getAllQuizzez() {
    try {
      const allQuizzez = await axios.get(`${serverUrl}/quiz`);
      const reversedQuizzes = allQuizzez.data.reverse();
      setQuizzez(reversedQuizzes);
      setFilteredQuizzez(reversedQuizzes);
    } catch (error) {
      console.log(error);
    }
  }

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

      <h2>Recent Categories With Quizzez</h2>
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
  );
};

export default QuizManagement;
