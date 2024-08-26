// pages/QuizManagement.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
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
  const [isExpanded, setIsExpanded] = useState(false);

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

  const handleToggle = () => {
    setVisibleQuizzez(isExpanded ? 4 : navigate("/quizzez"));
    setIsExpanded(!isExpanded);
  };

  // Handle filter changes
  const handleFilterChange = ({ category, status, title }) => {
    let filtered = quizzez;
    // Filter by category if a category is selected
    if (category) {
      filtered = filtered.filter((quiz) => quiz.category.name === category);
    }
    // Filter by status if a status is selected
    if (status) {
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

  return (
    <div>
      <h1>Quiz Management</h1>
      <Link to="/create-quiz">
        <BasicButton value="Create New Quiz" />
      </Link>

      {/* Add QuizFilter component */}
      <QuizFilter onFilterChange={handleFilterChange} />

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
        {filteredQuizzez.length > 4 && (
          <BasicButton
            value={isExpanded ? "See Less" : "See More"}
            onClick={handleToggle}
          />
        )}
      </div>

      <h2>Recent Categories</h2>
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
            <CategoryCard key={category._id} categoryName={category.name} />
          ))}
      </div>
    </div>
  );
};

export default QuizManagement;
