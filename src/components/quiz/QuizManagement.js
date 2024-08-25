import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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

  return (
    <div>
      <h1>Quiz Management</h1>
      <Link to="/create-quiz">
        <button>Create New Quiz</button>
      </Link>
      <div>
        {quizzez.map((quiz) => (
          <div key={quiz._id}>
            <h3>{quiz.title}</h3>
            <p>{quiz.description}</p>
            <Link to={`/edit-quiz/${quiz._id}`}>
              <button>Edit</button>
            </Link>
            <button>Delete</button>
            <Link to={`/questionForm/${quiz._id}`}>
              <button>Add Questions</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizManagement;
