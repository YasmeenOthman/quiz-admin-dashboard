import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import QuizCard from "../../components/QuizCard";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const QuizManagement = () => {
  const [quizzez, setQuizzez] = useState([]);

  useEffect(() => {
    getAllQuizzez();
  }, []);

  async function getAllQuizzez() {
    try {
      const allQuizzez = await axios.get(`${serverUrl}/quiz`);
      setQuizzez(allQuizzez.data);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(quizzez);
  return (
    <div>
      <h1>Quiz Management</h1>

      <div>
        {quizzez.length === 0 ? (
          <h2>It’s a great time to create your first quiz and get started!</h2>
        ) : (
          quizzez.map((quiz) => (
            <QuizCard
              key={quiz._id}
              title={quiz.title}
              description={quiz.description}
              dateCreated={quiz.dateCreated}
              createdBy={quiz.createdBy}
              imageUrl={quiz.imageUrl}
              quizId={quiz._id}
              numberOfQuestions={quiz.questions.length}
            />
          ))
        )}
      </div>
      <Link to="/create-quiz">
        <button>Create New Quiz</button>
      </Link>
    </div>
  );
};

export default QuizManagement;
