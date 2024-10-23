import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "./quizlist.scss";
import QuizCard from "../../../components/QuizCard";
import QuizFilter from "../quizfilter/QuizFilter";

const serverUrl = process.env.REACT_APP_SERVER_URL;

function QuizList() {
  const navigate = useNavigate();
  const [quizzez, setQuizzez] = useState([]);
  const [filteredQuizzez, setFilteredQuizzez] = useState([]);

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

  useEffect(() => {
    async function getquizzez() {
      try {
        let res = await axios.get(`${serverUrl}/quiz`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        let receivedQuizzez = res.data.reverse();
        setQuizzez(receivedQuizzez);
        setFilteredQuizzez(receivedQuizzez);
      } catch (error) {
        console.log(error);
      }
    }
    getquizzez();
  }, []); // Add an empty dependency array to run this effect only once when the component mounts

  // Handle filter changes
  const handleFilterChange = ({ category, status, title }) => {
    let filtered = quizzez;
    // Filter by category if a category is selected
    if (category) {
      filtered = filtered.filter((quiz) => quiz.category?.name === category);
    }
    // Filter by status if a status is selected
    if (status) {
      console.log(filtered);
      filtered = filtered.filter((quiz) => quiz.status === status);
    }
    // Filter by title if a title is entered
    if (title) {
      filtered = filtered.filter((quiz) =>
        quiz.title.toLowerCase().includes(title.toLowerCase())
      );
    }

    setFilteredQuizzez(filtered);
  };

  // ---- delete a quiz -----
  const deleteQuiz = async (quizId) => {
    try {
      if (window.confirm("Are you sure you want to delete this quiz?")) {
        await axios.delete(`${serverUrl}/quiz/${quizId}`);
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
    <div className="all-quizzez-container">
      <div className="all-quizzez-title-container">
        <h1>All Quizzez</h1>
      </div>

      {/* Add QuizFilter component */}
      <QuizFilter onFilterChange={handleFilterChange} />
      {filteredQuizzez.length === 0 ? (
        <h2 className="quiz-list-cards-container">No quizzes found yet....</h2>
      ) : (
        <div className="quiz-list-cards-container">
          {filteredQuizzez.map((quiz) => (
            <QuizCard
              key={quiz._id}
              title={quiz.title}
              description={quiz.description}
              dateCreated={quiz.dateCreated}
              createdBy={quiz.createdBy}
              imageUrl={quiz.imageUrl}
              quizId={quiz._id}
              numberOfQuestions={quiz.questions.length}
              categoryName={quiz.category?.name}
              status={quiz.status}
              onDelete={deleteQuiz}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default QuizList;
