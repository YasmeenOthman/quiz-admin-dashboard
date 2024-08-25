import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import QuizCard from "../../components/QuizCard";
import BasicButton from "../../components/BasicButton";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const QuizManagement = () => {
  const [quizzez, setQuizzez] = useState([]);
  const [visibleQuizzez, setVisibleQuizzez] = useState(4); // Number of quizzes initially visible
  const [isExpanded, setIsExpanded] = useState(false); // Track if "See More" or "See Less" is clicked

  useEffect(() => {
    getAllQuizzez();
  }, []);

  async function getAllQuizzez() {
    try {
      const allQuizzez = await axios.get(`${serverUrl}/quiz`);
      setQuizzez(allQuizzez.data.reverse()); // Reverse to get the latest quizzes first
    } catch (error) {
      console.log(error);
    }
  }

  // Function to delete a quiz
  const deleteQuiz = async (quizId) => {
    try {
      if (window.confirm("Are you sure you want to delete this quiz?")) {
        await axios.delete(`${serverUrl}/quiz/${quizId}`);
        // Update the state to remove the deleted quiz
        setQuizzez(quizzez.filter((quiz) => quiz._id !== quizId));
      }
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  // see more/less than 4 quizzez
  const handleToggle = () => {
    if (isExpanded) {
      // If isExpanded is true (all quizzes are currently shown)
      setVisibleQuizzez(4); // Show only the first four quizzes
    } else {
      setVisibleQuizzez(quizzez.length); // Show all quizzes
    }
    setIsExpanded(!isExpanded); // Toggle the button state
  };

  return (
    <div>
      <h1>Quiz Management</h1>
      <Link to="/create-quiz">
        <BasicButton value="Create New Quiz" />
      </Link>
      <div>
        {quizzez.length === 0 ? (
          <h2>It’s a great time to create your first quiz and get started!</h2>
        ) : (
          quizzez.slice(0, visibleQuizzez).map((quiz) => (
            <QuizCard
              key={quiz._id}
              title={quiz.title}
              description={quiz.description}
              dateCreated={quiz.dateCreated}
              createdBy={quiz.createdBy}
              imageUrl={quiz.imageUrl}
              quizId={quiz._id}
              numberOfQuestions={quiz.questions.length}
              categoryName={quiz.category.name}
              onDelete={() => deleteQuiz(quiz._id)} // Pass the delete function
            />
          ))
        )}
        {quizzez.length > 4 && (
          <BasicButton
            value={isExpanded ? "See Less" : "See More"} // Toggle button text
            onClick={handleToggle}
          />
        )}
      </div>
    </div>
  );
};

export default QuizManagement;
