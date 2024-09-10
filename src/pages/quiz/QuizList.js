import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import QuizCard from "../../components/QuizCard";
import QuizFilter from "./QuizFilter";

const serverUrl = process.env.REACT_APP_SERVER_URL;

function QuizList() {
  const navigate = useNavigate();
  const [quizzez, setQuizzez] = useState([]);
  const [filteredQuizzez, setFilteredQuizzez] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/quiz-login");
    }
  }, []);
  useEffect(() => {
    async function getquizzez() {
      try {
        let res = await axios.get(`${serverUrl}/quiz`);
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
    <div>
      <h1>All Quizzez</h1>
      {/* Add QuizFilter component */}
      <QuizFilter onFilterChange={handleFilterChange} />
      {filteredQuizzez.length === 0 ? (
        <h2>No quizzes found yet</h2>
      ) : (
        filteredQuizzez.map((quiz) => (
          <Link to={`/quiz/${quiz._id}`}>
            <div key={quiz._id}>
              <QuizCard
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
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

export default QuizList;
