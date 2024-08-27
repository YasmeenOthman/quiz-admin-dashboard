import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const serverUrl = process.env.REACT_APP_SERVER_URL;

function QuizPage() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const res = await axios.get(`${serverUrl}/quiz/${quizId}`);
        setQuiz(res.data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    }
    fetchQuiz();
  }, [quizId]);

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{quiz.title}</h1>
      <p>{quiz.description}</p>
      {quiz.imageUrl && <img src={quiz.imageUrl} alt={quiz.title} />}
      <p>Category: {quiz.category?.name}</p>
      <p>Status: {quiz.status}</p>
      <p>Date Created: {new Date(quiz.dateCreated).toLocaleDateString()}</p>
      <p>Created By: {quiz.createdBy?.name}</p>
      <h2>Questions</h2>
      {quiz.questions.length > 0 ? (
        <ul>
          {quiz.questions.map((question) => (
            <li key={question._id}>
              <p>{question.questionText}</p>
              {question.questionType === "multiple-choice" && (
                <ul>
                  {question.choices.map((choice, index) => (
                    <li key={index}>{choice}</li>
                  ))}
                </ul>
              )}
              <p>Correct Answer: {String(question.correctAnswer)}</p>
              {question.explanation && (
                <p>Explanation: {question.explanation}</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No questions available for this quiz.</p>
      )}
    </div>
  );
}

export default QuizPage;
